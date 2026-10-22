import {test, expect} from '../../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../../utilities/allureEvidence';

test('TC-CART-002 - Eliminar mochila del carrito', async ({loggedInProductsPage, cartPage, page}) => {
    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Carrito de compra');
    await allure.story('Eliminar productos del carrito');
    await allure.story('normal');
    await allure.description('Resultado esperado: el usuario puede eliminar la mochila del carrito y comprobar que ya no hay productos.');

    await allure.step('Paso 1 - Agregar la mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('Paso 2 - Abrir el carrito', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);

        await guardarEvidencia(page, 'Evidencia 01 - Mochila en el carrito');
    });

    await allure.step('Paso 3 - Eliminar la mochila', async () => {
        await cartPage.removeBackpack();
        await expect(cartPage.cartItems).toHaveCount(0);

        await guardarEvidencia(page, 'Evidencia 02 - Carrito vacio');
    });

});