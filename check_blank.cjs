const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
    const html = await page.content();
    console.log("HTML length:", html.length);
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log("Body text preview:", bodyText.slice(0, 100));

    await browser.close();
})();
