import { Page } from "@playwright/test";
import { LoginPage } from "../page/loginPage";

export async function iniciarSesion(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
}