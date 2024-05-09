import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Card validation form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test(' class to be bgValid if card number is correct', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.widget__form');
    const input = await form.$('.input');
    const submit = await form.$('.button');
    await input.type('4111111111111111');
    await submit.click();
    await page.waitForSelector('.input.bgValid');
    });

  test('class to be bgInvalid if card number is not correct', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.widget__form');
    const input = await form.$('.input');
    const submit = await form.$('.button');
    await input.type('4111111111111111111111');
    await submit.click();
    await page.waitForSelector('.input.bgInvalid');
  });
});