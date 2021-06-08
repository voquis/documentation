const { chromium } = require('playwright');
const path = require('path');

let browser;
let context;
let page;

beforeAll(async () => {
  // Launch browser with config
  browser = await chromium.launch({
    slowMo: 1000
  });
  // Launch browser session with recording
  context = await browser.newContext({
    recordVideo: {
      dir: 'recordings'
    }
  });
  // Launch new tab
  page = await context.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe('Currencies', () => {
  it('1 EUR > 1 GBP', async () => {
    // Navigate to home page
    await page.goto(`file:${path.join(__dirname, 'test.html')}`);
    // Find button to click
    await page.click('#get-rate');
    // Extract the value from result
    const eur = await page.textContent('#result');
    // Assert expected result
    expect(Number(eur) > 1).toBeTruthy();
  });
});
