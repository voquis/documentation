# Documentation

This repository is a collection of technical resources for software and systems engineers.

## Contents
### [Git](git/README.md): the source control tool
### [GPG](gpg/README.md): the public key encryption utility
### [SSH](ssh/README.md): the secure shell tool

### [AWS](aws/README.md): interacting with the public cloud provider

### Testing: writing and running tests
#### Unit Testing
Unit tests verify the behaviour of isolated sub-systems.
At the lowest level, this would test code functions.
At higher levels this would be a collection of code or a unit of infrastructure.
In unit tests, dependencies on external services are mocked/stubbed out.

##### JavaScript testing
###### [QUnit](testing/unit-testing/javascript/qunit/README.md): in-browser testing

#### Integration Testing
Integration tests verify behaviour behaviour between independent sub-system.
At lower levels this would test the behaviour of code functions with external systems.
At higher levels this would test the behaviour of collections of code or infrastructure with other external services.
##### JavaScript testing
###### [QUnit](testing/integration-testing/javascript/qunit/README.md): in-browser testing

#### UI (user interface) testing
##### JavaScript testing
###### [Playwright](testing/ui-testing/javascript/playwright/README.md): browser testing
