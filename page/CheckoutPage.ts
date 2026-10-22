import {Page, Locator} from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly title: Locator;
    readonly confirmationMessage: Locator;
    readonly errorMessage: Locator;
    readonly summaryitems: Locator;
    readonly itemPrices: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.title = page.locator('.title');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.summaryitems = page.locator('.cart_item');
        this.itemPrices = page.locator('.inventory_item_price');
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
    }

    async fillCustomerInformation(firstName: string,lastName: string,postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click()
    }

    async finisOrder() {
        await this.finishButton.click()
    }
}