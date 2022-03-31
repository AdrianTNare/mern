import puppeteer from 'puppeteer';

const formatUrl = url => {
  let formatted = url.includes('https://') || url.includes('http://') ? url : `https://${url}`;

  return formatted;
};

const puppeteerGetHtml = async url => {
  const options = {
    headless: true,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  };

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    await page.goto(formatUrl(url));

    const content = await page.content();

    return content;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default puppeteerGetHtml;
