import {test, expect} from '../../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../../utilities/allureEvidence';

test('TC-CART-002 - Agregar mochila al carrito', async ({loggedInProductsPage, cartPage, page}) => {

    await allure.epic('QA Automation - SauceDemon');
    await allure.feature('Catalogo de productos');
    await allure.story('Agregar productos al carrito');
    await allure.severity('Normal');
    await allure.description('Resultado esperado: el usuario agrega una mochila al carrito y verifica que el producto se encuentre correctamente.');
    await allure.step( 'Paso 1 - Validar que estamos en el producto', async () => {

        await expect(loggedInProductsPage.title).toHaveText('Products');
        await guardarEvidencia(page, 'Evidencia 01 - Catálogo de producto');
    });


    await allure.step('Paso 2 - Agregar la mochila al carrito', async () => {

        await loggedInProductsPage.addBackpackToCar();
        await guardarEvidencia(page, 'Mochila agregada')
    });

    await allure.step('Paso 3 - Abrir el carrito', async () => {

        await loggedInProductsPage.openCart();
        await guardarEvidencia(page, 'Carrito abierto');
    })

    await allure.step('Paso 4 - Validar que estamos en el carrito', async () =>{

        await expect(cartPage.title).toHaveText('Your Cart');
        await guardarEvidencia(page, 'Pantalla carrito')
    }) 

    await allure.step('Paso 5 - Validar que solo hay un producto', async () => {
        
        await expect(cartPage.cartItems).toHaveCount(1);
        await guardarEvidencia(page, 'Producto validado');
    });

    await allure.step('Paso 6 - Validar el nombre del producto', async () => {

        await expect(cartPage.backPack).toHaveText('Sauce Labs Backpack');
        await guardarEvidencia(page, 'Nombre validado');
    }) 

}); 