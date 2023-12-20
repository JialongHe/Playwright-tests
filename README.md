# About

This project is a repository for E2E testing using Playwright.

# Playwright

This part will introduce some Playwright operations. Official documents are ![here](https://playwright.dev/docs/intro).


# SUT

A Web [Visual Novel Editor](https://github.com/Kirilllive/tuesday-js),please check the [tutorial](https://kirilllive.github.io/tuesday-js/doc_editor.html#quick_tutorial)

## run tests
```
npx playwright test

// run tests in UI mode
npx playwright test --ui
```

## show reports
```
npx playwright show-report
```

## write tests

There are 2 ways of writing tests: [Manually](https://playwright.dev/docs/writing-tests) and [Generating Code from Actions](https://playwright.dev/docs/codegen-intro)

```
npx playwright codegen YourUrl
```