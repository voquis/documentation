# Unit testing in javascript

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
This is a trivial function that will increment a given number.
This snippet would form part of our app code base.
```html
<script>
  function addOne(a) {
    return a + 1;
  }
</script>
```

### Writing passing tests
Add the following to the `<body>` section after the code to test.
This test will ensure that given a value of `4`, the expected value of `5` is returned.
This code does not form part of our functional app code and is only used for quality assurance.
```html
<script>
  QUnit.module('add', function() {
    QUnit.test('should add 1', (assert) => {
      assert.equal(addOne(4), 5);
    });
  });
</script>
```
A module is a collection of related tests.

### Running tests
Open `test.html` in a browser window to execute the tests and see the report.

### Causing test failures
Change the function `addOne` to instead add 2:
<script>
  function addOne(a) {
    return a + 1;
  }
</script>
```
Rerun the tests to see a failure.
Alternatively, change the assertion to expect a different number and rerun the tests to see a failure.
