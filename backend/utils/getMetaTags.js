import * as cheerio from 'cheerio';

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

export default getMetaTags;
