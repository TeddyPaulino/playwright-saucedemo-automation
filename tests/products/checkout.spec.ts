import {test, expect} from '../../fixtures/test.fixture'
import { guardarEvidencia } from '../../utilities/allureEvidence';
// import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';

test('TC-COMPRA-001 - Completar la compra de una mochila', async ({page, loggedInProductsPage, cartPage, checkOutPage}) => {

    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Proceso de Compra');
    await allure.story('Compra Productos');
    await allure.severity('Critical');
    await allure.description('Validar que un usuario pueda agregar una mochila al carrito, ' + 'completar sus datos y finalizar la compra correctamente.'

)

    await allure.step('1.  Verificar que estamos en el producto', async () => {

        await expect(loggedInProductsPage.title).toHaveText('Products');
        
        await guardarEvidencia(page, 'Evidencia 01 - Productos')
    });

    await allure.step('2. Agregar mochila en el carrito', async () => {
        await  loggedInProductsPage.addBackpackToCar();

        await guardarEvidencia(page, 'Evidencia 02 - Mochila Agregada')
    });

    await allure.step('3. Abrir y verificar el carrito', async () => {

        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.backPack).toHaveText('Sauce Labs Backpack');

        await guardarEvidencia(page, 'Evidencia 03 - Carrito' )
    });


    await allure.step('4. Completar datos del cliente', async () => {
        await cartPage.checkOut();
        await checkOutPage.fillCustomerInformation('Teddy', 'QA', '11501');
        await guardarEvidencia(page, 'Evidencia 04 - Datos del cliente')
    });

    await allure.step('5. Continuar al resumen', async () => {
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.title).toHaveText('Checkout: Overview');
        await guardarEvidencia(page, 'Evidencia 05 - Resumen de compra');
    });


    await allure.step('6. Confirmar la compra', async () => {
        await checkOutPage.finisOrder();
        await expect(checkOutPage.confirmationMessage).toHaveText("Thank you for your order!");

        await guardarEvidencia(page, 'Evidencia 06 - Compra completada');

    });


});