# Assignment 2: Verify Shopping Cart

Playwright and TypeScript test using Page Object Models and a custom fixture.

Application: https://automationexercise.com/

Login is not required.

## Prerequisites

- A Node.js version supported by Playwright
- npm
- Internet access

## Setup

Clone this repository and open a terminal in the project folder.

Install dependencies:

```bash
npm ci
```

Install Chromium:

```bash
npx playwright install chromium
```

## Run

Check TypeScript types:

```bash
npm run typecheck
```

Run tests in headless mode:

```bash
npm test
```

Run with the browser visible:

```bash
npm run test:headed
```

Run in debug mode:

```bash
npm run test:debug
```

Run in interactive UI mode:

```bash
npm run test:ui
```

View the HTML report after running tests:

```bash
npm run report
```

## Project structure

- pages/ProductsPage.ts: Opens Products and selects a product.
- pages/ProductDetailsPage.ts: Captures product data and adds quantities.
- pages/CartPage.ts: Cart row locators and removal actions.
- fixtures/test.ts: Provides page objects and blocks common advertising requests.
- tests/cart.spec.ts: Shopping cart test and assertions.
- playwright.config.ts: Browser, URL, timeouts, and reporting.
- tsconfig.json: TypeScript configuration.

## Test coverage

1. Verify the cart starts empty in a fresh browser context.
2. Open the first product and capture its name and unit price.
3. Add three units and click Continue Shopping.
4. Open a different product and capture its name and unit price.
5. Add one unit and click Continue Shopping.
6. Verify the cart contains exactly the two selected products.
7. Verify each name, unit price, quantity, and calculated total.
8. Remove the first product and verify only the second remains.
9. Remove the second product.
10. Verify no product rows remain and the empty-cart message is visible.

The selected product IDs are 1 and 2. Names and prices are captured from the
product details pages.

## Notes

The test uses the live application and requires internet access. Common Google
advertising requests are blocked to reduce ad interference.
