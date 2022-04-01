// import axios from 'axios';
import CrawledPage from '../models/CrawledPageModel';
import getMetaTags from '../utils/getMetaTags';
import puppeteerGetHtml from '../utils/puppeteerGetHtml';

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
