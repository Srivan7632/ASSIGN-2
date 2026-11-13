import { test, expect } from '../fixtures/test';

test('Verify cart contents, quantities, prices and removal', async ({ shop }) => {
  const { productsPage, productDetailsPage, cartPage } = shop;

  await test.step('Verify the cart starts empty', async () => {
    await cartPage.goto();
    await expect(cartPage.productRows).toHaveCount(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toContainText('Cart is empty!');
  });

  const firstProduct = await test.step(
    'Capture the first product and add three units',
    async () => {
      await productsPage.open();
      await productsPage.viewProduct(1);
      const product = await productDetailsPage.captureProduct();
      expect(product.name).not.toBe('');
      expect(product.unitPrice).toBeGreaterThan(0);
      await productDetailsPage.addToCart(3);
      await productDetailsPage.continueShopping();
      return product;
    }
  );

  const secondProduct = await test.step(
    'Capture a different product and add one unit',
    async () => {
      await productsPage.open();
      await productsPage.viewProduct(2);
      const product = await productDetailsPage.captureProduct();
      expect(product.id).not.toBe(firstProduct.id);
      expect(product.name).not.toBe('');
      expect(product.unitPrice).toBeGreaterThan(0);
      await productDetailsPage.addToCart(1);
      await productDetailsPage.continueShopping();
      return product;
    }
  );

  await test.step('Verify only the selected products are in the cart', async () => {
    await cartPage.open();
    await expect(cartPage.productRows).toHaveCount(2);
    await expect(cartPage.product(firstProduct.id).row).toBeVisible();
    await expect(cartPage.product(secondProduct.id).row).toBeVisible();
  });

  const expectedProducts = [
    { product: firstProduct, quantity: 3 },
    { product: secondProduct, quantity: 1 }
  ];

  for (const { product, quantity } of expectedProducts) {
    await test.step(`Verify cart details for ${product.name}`, async () => {
      const cartProduct = cartPage.product(product.id);
      await expect(cartProduct.name).toHaveText(product.name);
      await expect(cartProduct.unitPrice).toHaveText(`Rs. ${product.unitPrice}`);
      await expect(cartProduct.quantity).toHaveText(String(quantity));
      await expect(cartProduct.total).toHaveText(
        `Rs. ${product.unitPrice * quantity}`
      );
    });
  }

  await test.step('Remove the first product and verify the second remains', async () => {
    await cartPage.removeProduct(firstProduct.id);
    await expect(cartPage.product(firstProduct.id).row).toHaveCount(0);
    await expect(cartPage.productRows).toHaveCount(1);
    const remainingProduct = cartPage.product(secondProduct.id);
    await expect(remainingProduct.row).toBeVisible();
    await expect(remainingProduct.name).toHaveText(secondProduct.name);
    await expect(remainingProduct.unitPrice).toHaveText(
      `Rs. ${secondProduct.unitPrice}`
    );
    await expect(remainingProduct.quantity).toHaveText('1');
    await expect(remainingProduct.total).toHaveText(
      `Rs. ${secondProduct.unitPrice}`
    );
  });

  await test.step('Remove the second product and verify the cart is empty', async () => {
    await cartPage.removeProduct(secondProduct.id);
    await expect(cartPage.productRows).toHaveCount(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toContainText('Cart is empty!');
  });
});
