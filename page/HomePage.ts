import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly product: Locator;
    readonly shoppingCart: Locator;
    readonly menuButto: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.product = page.locator('.inventory_item');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.menuButto = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async logout() {
        await this.menuButto.click();
        await this.logoutLink.click();
    }
}