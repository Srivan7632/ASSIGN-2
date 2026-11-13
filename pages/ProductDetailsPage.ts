import { expect, type Locator, type Page } from '@playwright/test';

export type ProductInfo = {
  id: number;
  name: string;
  unitPrice: number;
};

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartModal: Locator;

  constructor(private readonly page: Page) {
    const information = page.locator('.product-information');
    this.productName = information.locator('h2');
    this.productPrice = information.locator('span > span');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = information.getByRole('button', {
      name: /Add to cart/
    });
    this.cartModal = page.locator('#cartModal');
  }

  async captureProduct(): Promise<ProductInfo> {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toHaveText(/^Rs\.\s*[\d,]+$/);

    const name = (await this.productName.innerText()).trim();
    const priceText = await this.productPrice.innerText();
    const unitPrice = Number(
      priceText.replace('Rs.', '').replaceAll(',', '').trim()
    );
    const match = new URL(this.page.url()).pathname.match(
      /^\/product_details\/(\d+)$/
    );

    if (!match) {
      throw new Error('The current page is not a product details page.');
    }

    return { id: Number(match[1]), name, unitPrice };
  }

  async addToCart(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await expect(this.quantityInput).toHaveValue(String(quantity));
    await this.addToCartButton.click();
    await expect(this.cartModal).toBeVisible();
    await expect(this.cartModal).toContainText(
      'Your product has been added to cart.'
    );
  }

  async continueShopping(): Promise<void> {
    await this.cartModal
      .getByRole('button', { name: 'Continue Shopping' })
      .click();
    await expect(this.cartModal).toBeHidden();
  }
}
