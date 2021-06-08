# UI (user interface) testing in javascript
This example tests the UI of a trivial web app that integrates a [third-party currency exchange rate service](https://freecurrencyapi.net).
It is assumed Docker is installed.

## Testing with Playwright
[Playwright](https://playwright.dev) is an open source project from Microsoft that allows launching web browsers headlessly.  It provides an interface to control the browser via JavaScript test code.
The [Jest](https://jestjs.io/) test runner framework and assertion library is used to execute tests.

### Adding code to test
Create a new `playwright` directory to store test files and application code:
```shell
mkdir playwright
```
Inside the `playwright` directory, create a new html file named `test.html` with the following content.
This is a minimal HTML page that makes a HTTP request to fetch remote data, then updates the page dynamically.
```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>UI testing</title>
</head>
<body>
  <!-- Code to test -->
  <button id="get-rate" onclick="renderEurForOneGbp()">Get Rate</button>
  <div id="rate">Click above to get rate</div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    function renderEurForOneGbp() {
      // URL for remote data fetch
      const url = "https://freecurrencyapi.net/api/v1/rates?base_currency=GBP";
      // Make asynchronous javacsript (AJAX) call to URL to fetch data
      $.get(url, (response) => {
        // Extract useful data from the response
        data = response.data;
        date = Object.keys(data)[0];
        eur = data[date]['EUR'];
        $('#rate').html(`<p id="result">${eur}</p>`);
      });
    }
  </script>
</body>
```

### Setting up test framework
#### Start a Docker container
Start a Docker container provided by Microsoft pre-built with browsers and based on nodejs using the following command.The `-v` command mounts the current directory as a directory inside the container.  It is assumed you are in the newly created `playwright` directory:
```shell
docker run -it \
-v $(pwd):/tests \
-w /tests \
mcr.microsoft.com/playwright:focal
```

#### Installing dependencies
To installing dependencies, create a new file called `package.json`, again inside the newly created `playwright` directory.
This file is used to control node package manager (npm) dependencies.
Add the following content, noting `jest` and `playwright` libraries.
```json
{
  "name": "ui-tests",
  "version": "1.0.0",
  "description": "UI tests",
  "main": "test.js",
  "devDependencies": {
    "jest": "^27.0.4",
    "playwright": "^1.11.1"
  },
  "scripts": {
    "test": "jest"
  }
}
```

Then in the container shell run:
```shell
npm install
```
This will install playwright and jest with and their dependencies into `node_modules`, using the `package.json` file for version and package names.

### Writing passing tests
Add the following to a new file called `test.js`.
This test will launch a Chrome (Chromium) browser.

```js
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
```
The `describe` directive is a collection of related tests, `it` describes a single test.

### Running tests
Invoke the jest test runner that will scan the directory for `*.test.js` files with the following (inside the container):
```shell
npm test
```

### Causing test failures
Change the function `renderEurForOneGbp` to instead return a value less than `1`:
```html
<script>
  function renderEurForOneGbp() {
    $('#rate').html(`<p id="result">0.9</p>`);
  }
</script>
```
Rerun the tests to see a failure.
Alternatively, change the assertion (`expect`) to expect a different number and rerun the tests to see a failure.
