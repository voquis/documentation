# Integration testing in javascript
This example tests integration between a simple function and a [third-party currency exchange rate service](https://freecurrencyapi.net).

## Testing in the browser with QUnit
[QUnit](https://qunitjs.com/intro/) is a project from the jQuery team.
QUnit allows tests to be run directly in a web browser.

### Setting up test framework
Create a new HTML file named `test.html` with the following content.  This is a minimal HTML page with the QUnit library loaded remotely.
There are no tests or any custom code yet, these will be added in the next section.
```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>Unit testing</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.16.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="https://code.jquery.com/qunit/qunit-2.16.0.js"></script>
</body>
```

### Adding code to test
Add the following code to test to the `<body>` section after the test framework set up.
This is a function uses the jQuery library that simplifies writing JavaScript code.
The function will fetch data using AJAX (asynchronous JavaScript) from a remote third-party service.
This snippet would form part of our app code base.
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  async function getEurForOneGbp() {
    // URL for remote data fetch
    const url = "https://freecurrencyapi.net/api/v1/rates?base_currency=GBP";
    // Make asynchronous javacsript (AJAX) call to URL to fetch data
    response = await $.get(url);
    // Extract useful data from the response
    data = response.data;
    date = Object.keys(data)[0];
    eur = data[date]['EUR'];
    return eur;
  }
</script>
```

### Writing passing tests
Add the following to the `<body>` section after the code to test.
This test will ensure that given a value of `4`, the expected value of `5` is returned.
This code does not form part of our functional app code and is only used for quality assurance.
```html
<script>
  QUnit.module('Currency', function() {
    QUnit.test('1 EUR more than 1 GBP', async (assert) => {
      gbp = 1;
      eur = await getEurForOneGbp();
      assert.true(eur > gbp);
    });
  });
</script>
```
A module is a collection of related tests.

### Running tests
Open `test.html` in a browser window to execute the tests and see the report.

### Causing test failures
Change the function `getEurForOneGbp` to return a value less than `1` to trigger a failure:
```html
<script>
  function getEurForOneGbp() {
    return 0.9;
  }
</script>
```
Rerun the tests to see a failure.
Alternatively, change the assertion to expect `false` instead of `true ` and rerun the tests to see a failure.
