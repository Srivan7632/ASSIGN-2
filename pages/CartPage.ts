import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly productRows: Locator;
  readonly emptyCartMessage: Locator;

  constructor(private readonly page: Page) {
    this.productRows = page.locator(
      '#cart_info_table tbody tr[id^="product-"]'
    );
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async goto(): Promise<void> {
    await this.page.goto('/view_cart');
  }

  async open(): Promise<void> {
    await this.page
      .locator('header')
      .getByRole('link', { name: /Cart/ })
      .click();
  }

  product(productId: number) {
    const row = this.page.locator(`#product-${productId}`);
    return {
      row,
      name: row.locator('.cart_description h4 a'),
      unitPrice: row.locator('.cart_price p'),
      quantity: row.locator('.cart_quantity button'),
      total: row.locator('.cart_total_price'),
      removeButton: row.locator('a.cart_quantity_delete')
    };
  }

  async removeProduct(productId: number): Promise<void> {
    await this.product(productId).removeButton.click();
  }
}
