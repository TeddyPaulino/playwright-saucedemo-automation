
import {test as base, expect} from "@playwright/test";
import { iniciarSesion } from "../utilities/authentication";

import { LoginPage } from "../page/loginPage";
import { HomePage } from "../page/HomePage";
import {ProductsPage} from "../page/ProductPage";
import { CartPage } from "../page/CartPage";
import { CheckoutPage } from "../page/CheckoutPage";

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    loggedInPage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    loggedInProductsPage: ProductsPage;
    checkOutPage: CheckoutPage
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage); 
    },

    homePage: async ({page}, use ) => {
    const homePage = new HomePage(page);
    await use(homePage);

    },

    loggedInPage: async ({page}, use) => {
        // const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await page.goto('https://www.saucedemo.com/');
        // await loginPage.login( 'standard_user','secret_sauce');
        await iniciarSesion(page);

        await use(homePage)
    },

    productsPage: async ({page}, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    loggedInProductsPage: async ({page}, use) => {
        // const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // await page.goto('https://www.saucedemo.com/');

        // await loginPage.login('standard_user', 'secret_sauce');
        await iniciarSesion(page);

        await use(productsPage);
    },

    checkOutPage: async ({page}, use) => {
        const checkOutPage = new CheckoutPage(page);
        await use(checkOutPage);
    }

});

export {expect}

