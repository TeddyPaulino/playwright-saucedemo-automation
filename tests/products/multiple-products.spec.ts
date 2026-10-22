import {test, expect} from '../../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../../utilities/allureEvidence';

test('TC-CART-003 - Agregar dos productos al carrito', async ({loggedInProductsPage, cartPage, page}) => {

    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Carrito de compra');
    await allure.story('Agregar multiple productos');
    await allure.severity('normal');
    await allure.description('Resultado esperado: la mochila y la camiseta se agregan correctamente y aparecen como dos productos en el carrito.');

    await allure.step('Paso 1 - Agregar la mochila', async () => {
        await loggedInProductsPage.addBackpackToCar();

    });

    await allure.step('Paso 2 - Agregar la camisa', async () => {
        await loggedInProductsPage.addShirtToCar();
        await guardarEvidencia(page, 'Evidencia 01 - Dos productos agregados');
    });

    await allure.step('Paso 3 - Abrir el carrito', async () => {
        await loggedInProductsPage.openCart();
    });

    await allure.step('Paso 4 - Validar la cantidad de productos', async () => {
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(2);
    });

    await allure.step('Paso 5 - Validar los nombres de los productos', async () => {
        await expect(cartPage.backPack).toHaveText([
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ]);
        await guardarEvidencia(page, 'Evidencia 02 - Carrito con dos productos')
    });
    
});