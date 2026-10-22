import {test, expect} from '../../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../../utilities/allureEvidence';


test('TC-CHECKOUT-006 - Validar importes del resumen de compra', async ({loggedInProductsPage, cartPage, checkOutPage, page}) => {
    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Proceso de compra');
    await allure.story('Validación de importes');
    await allure.severity('Critical');
    await allure.description('Validar que el resumen muestre la mochila, su precio, subtotal, impuestos y total calculados correctamente.');

    await allure.step('Paso 1 - Agregar una mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('Paso 2 - Entrar al resumen de compra', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await cartPage.checkOut();
        await checkOutPage.fillCustomerInformation('Teddy', 'Paulino', '0505');
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.title).toHaveText('Checkout: Overview');
    });

    await allure.step('Paso 3 - Verificar precio y producto', async () => {
        await expect(checkOutPage.summaryitems).toHaveCount(1);
        await expect(checkOutPage.itemPrices).toHaveText('$29.99');
        await guardarEvidencia(page, 'Evidencia 01 - Producto y presio en el resumen');
    });

    await allure.step('Paso 4 - Verificar subtotal, impuestos y total', async () => {
        await expect(checkOutPage.subtotal).toHaveText('Item total: $29.99');
        await expect(checkOutPage.tax).toHaveText('Tax: $2.40');
        await expect(checkOutPage.total).toHaveText('Total: $32.39');
        await guardarEvidencia(page, 'Evidencia 02 - Importes resumen')
    })

})