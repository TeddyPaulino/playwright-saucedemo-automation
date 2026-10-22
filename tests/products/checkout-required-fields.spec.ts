import {test, expect} from '../../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../../utilities/allureEvidence';
import { CheckoutPage } from '../../page/CheckoutPage';

 
test('TC-CHECKOUT-002 - Continuar sin completar los datos obligatorios', async ({loggedInProductsPage, cartPage, page, checkOutPage}) => {
    
    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Proceso de compra');
    await allure.story('Validación de campos obligatorios');
    await allure.severity('normal');
    await allure.description('Resultado esperado: el sistema impide continuar al checkout si no se completan los datos obligatorios y muestra el error correspondiente.'
    );

    await allure.step('Paso 1 - Agregar una mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('Paso 2 -  Verificar la pantalla de información del cliente', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await expect(cartPage.cartItems).toHaveCount(1);
        await cartPage.checkOut();
    });

    await allure.step('Paso 3 - Verificar la pantalla de información del cliente', async () => {
        await expect(checkOutPage.title).toHaveText('Checkout: Your Information');
    });

    await allure.step('Paso 4 - Continuar con los campos vacíos', async () => {
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.errorMessage).toHaveText('Error: First Name is required');
        await guardarEvidencia(page, 'Evidencia 01 - Error por nombre')
    })
});

test('TC-CHECKOUT-003 - Validar apellido obligatorio', async ({loggedInProductsPage, cartPage, page, checkOutPage}) => {

    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Proceso de compra');
    await allure.story('Validación de campos obligatorios');
    await allure.severity('Normal');
    await allure.description('Resultado esperado: el sistema impide continuar cuando el apellido está vacío y muestra el mensaje correspondiente.');

    await allure.step('Paso 1 - Agregar mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('Paso 2 - Abrir el carrito', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await cartPage.checkOut();
        await expect(checkOutPage.title).toHaveText('Checkout: Your Information');
    });

    await allure.step('Paso 3 - Completar los campos excepto el apellido', async () => {
        await checkOutPage.fillCustomerInformation('Teddy', '', '0101');
        await guardarEvidencia(page, 'Evidencia 01 Formulario si apellido');
    });

    await allure.step('Paso 4 - Paso 4 - Validar el mensaje de apellido obligatorio', async () => {
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.errorMessage).toHaveText('Error: Last Name is required');

        await guardarEvidencia(page, 'Evidencia 02 - Error por apellido obligatorio');
    });
});

 test('TC=CHECKOUT-004 Validar codigo postal', async ({loggedInProductsPage, cartPage, page, checkOutPage}) => {
        await allure.epic('QA Automation - SauceDemo');
        await allure.feature('Proceso de compra');
        await allure.story('Validación de campos obligatorios');
        await allure.severity('Normal');
        await allure.description('Resultado esperado: el sistema impide continuar cuando el apellido está vacío y muestra el mensaje correspondiente.');

         await allure.step('01 - Agregar mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('02 - Abrir el carrito', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await cartPage.checkOut();
        await expect(checkOutPage.title).toHaveText('Checkout: Your Information');
    });

    await allure.step('03 - Completar los campos excepto el codigo postal', async () => {
        await checkOutPage.fillCustomerInformation('Teddy', 'Paulino', '');
        await guardarEvidencia(page, 'Evidencia 01 - Formulario sin codigo postal')
        
    });

    await allure.step('04 - Validar el mensaje de apellido obligatorio', async () => {
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.errorMessage).toHaveText('Error: Postal Code is required')
        await guardarEvidencia(page,'Evidencia 02 - Error codigo postal obligatorio');
    });
});

test('TC-CHECLOUT-005 Validar todos los campos', async ({loggedInProductsPage, checkOutPage, cartPage, page}) => {

    await allure.step('Paso 1 - Agregar la mochila al carrito', async () => {
        await expect(loggedInProductsPage.title).toHaveText('Products');
        await loggedInProductsPage.addBackpackToCar();
    });

    await allure.step('Paso 2 - Abrir el carrito', async () => {
        await loggedInProductsPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await cartPage.checkOut();
        await expect(checkOutPage.title).toHaveText('Checkout: Your Information');
    });

    await allure.step('Paso 3 - Completar el formulario con todos los datos ', async () => {
        await checkOutPage.fillCustomerInformation('Teddy', 'Paulino', '0505');
        await guardarEvidencia(page, 'Evidencia 01 Todos los campos completado');

    });

    await allure.step('Paso 4 -  Avanzar al resumen de compra', async () => {
        await checkOutPage.continueToOverview();
        await expect(checkOutPage.title).toHaveText('Checkout: Overview');
        await guardarEvidencia(page, 'Evidencia 02 Resumen de compra');
    });

});

   

