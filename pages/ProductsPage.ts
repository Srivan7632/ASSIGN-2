import type { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page
      .locator('header')
      .getByRole('link', { name: /Products/ })
      .click();
  }

  async viewProduct(productId: number): Promise<void> {
    await this.page
      .locator(`a[href="/product_details/${productId}"]`)
      .click();
  }
}
