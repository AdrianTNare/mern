import axios from 'axios';
import * as cheerio from 'cheerio';
import CrawledPage from '../models/CrawledPageModel';
import puppeteerGetHtml from '../utils/puppeteerGetHtml'

const getMetaTags = (url, data) => {
  const $ = cheerio.load(data);

  let metaUrl = $('meta[name="url"]').attr('content') || $('meta[property="og:url"]').attr('content');

  let title = $('meta[property="og:title"]').attr('content') || $('meta[name="title"]').attr('content') || $('title').text();
  let description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');

  let h1 = $('h1')
    .map((i, e) => $(e).text())
    .get()
    .filter((item, index) => index < 2)
    .reduce((prev, current) => `${prev.trim()} ${current.trim()}`, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ');

  let h2 = $('h2')
    .map((i, e) => $(e).text())
    .get()
    .filter((item, index) => index < 2)
    .reduce((prev, current) => `${prev.trim()} ${current.trim()}`, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ');

  let linkCount = $('a').length;

  let computedUrl = metaUrl && (metaUrl !== null || metaUrl !== undefined) ? metaUrl : url;

  return {
    computedUrl,
    title,
    description,
    h1,
    h2,
    linkCount
  };
};

export const crawl = async (req, res) => {
  const { url } = req.body;

  const page = {
    url: undefined,
    title: undefined,
    description: undefined,
    h1: undefined,
    h2: undefined,
    linkCount: undefined
  };

  try {
    // let { data } = await axios.get(`https://${url}`);

    let data = await puppeteerGetHtml(url);
    const { computedUrl, description, h1, h2, title, linkCount } = getMetaTags(url, data);

    page.title = title;
    page.url = computedUrl;
    page.description = description;
    page.h1 = h1;
    page.h2 = h2;
    page.linkCount = linkCount;
    console.log(`url${computedUrl}`);
    console.log(page);

    await CrawledPage.create({ url: computedUrl, title, description, h1, h2, linkCount }).catch(e => {
      throw new Error(e);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e: { message: 'Error' } });
  }

  return res.json({ page });
};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory = (req, res) => {
  console.log(req.get('host'));
  CrawledPage.find({}, (error, pages) => {
    if (error) {
      return res.status(500).json(error);
    }

    return res.send(pages);
  });
};
