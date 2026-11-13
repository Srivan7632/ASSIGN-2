import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

type ShopFixtures = {
  shop: {
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
  };
};

export const test = base.extend<ShopFixtures>({
  shop: async ({ page, context }, use) => {
    await context.route(
      /^https?:\/\/(?:[^/]+\.)?(?:doubleclick\.net|googlesyndication\.com|googleadservices\.com)\//,
      route => route.abort()
    );

    await use({
      productsPage: new ProductsPage(page),
      productDetailsPage: new ProductDetailsPage(page),
      cartPage: new CartPage(page)
    });
  }
});

export { expect } from '@playwright/test';
