import {Page, Locator} from '@playwright/test'

export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartItems: Locator;
    readonly backPack: Locator;
    readonly removeBackpackButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.backPack = page.locator('[data-test="inventory-item-name"]');
        this.removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
        this.checkoutButton = page.locator('#checkout');
    }

    async checkOut() {
        await this.checkoutButton.click();
    }

    async removeBackpack() {
       await this.removeBackpackButton.click();
    }
}