import {Page, Locator} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly products: Locator;
    readonly backpackButton: Locator;
    readonly shoppingCart: Locator;
    readonly shirtButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.products = page.locator('.inventory_item');
        this.backpackButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.shirtButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    async addBackpackToCar() {
        await this.backpackButton.click();
    }

    async addShirtToCar() {
        await this.shirtButton.click();
    }

    async openCart() {
        await this.shoppingCart.click();
    }
}

