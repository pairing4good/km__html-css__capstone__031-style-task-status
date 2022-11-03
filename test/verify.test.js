const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the tasks div', () => {
  it('should contain three task items with statuses', async () => {
    const elements = await page.$$(`[id^="task-row-"] > [id^="task-description-"] + [id^="task-status-"]`);
    expect(elements.length).toBe(3);
  });
});

describe('the task description and status', () => {
  it('should display in the same row', async () => {
    const matches = await page.$eval('style', (style) => {
      return style.innerHTML.match(/\.row.*{[\s\S][^}]*display.*:.*flex.*;/g).length;
    });
    
    expect(matches).toEqual(1);
  });
});

describe('the task description', () => {
  it('should be padded with 5px', async () => {
    const padding = await page.$eval(`[id^="task-description-"]`, (description) => {
      let style = window.getComputedStyle(description);
      return style.getPropertyValue('padding');
    });

    expect(padding).toBe('5px');
  });
});

describe('the task status', () => {
  it('should be padded with 5px', async () => {
    const padding = await page.$eval(`[id^="task-status-"]`, (status) => {
      let style = window.getComputedStyle(status);
      return style.getPropertyValue('padding');
    });

    expect(padding).toBe('5px');
  });
});