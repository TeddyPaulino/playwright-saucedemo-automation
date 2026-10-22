
import {test, expect} from '../fixtures/test.fixture';
import * as allure from 'allure-js-commons';
import { guardarEvidencia } from '../utilities/allureEvidence';

test('TC-LOGIN-001 - Login exitoso', async ({loginPage, page}) => {

    await allure.epic('QA Automation - SauceDemo');
    await allure.feature('Autenticación');
    await allure.story('Inicio de sesión');
    await allure.severity('critical');
    await allure.description('Resultado esperado: el usuario válido accede al catálogo de productos.');

await allure.step('Paso 1 - Abrir la página de login', async () => {

    await page.goto('https://www.saucedemo.com/');
    await guardarEvidencia(page, '01 - Pantalla de login');
});

await allure.step('Paso 2 - Inicial sesión con credenciales válidas', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await guardarEvidencia(page, '02 - Login exitoso');
    
});

await allure.step('Paso 3 - Verificar el acceso a productos', async () => {
    
    await expect(page).toHaveURL(/inventory/);
    await guardarEvidencia(page, '03 - Catálogo de productos');
    });

});

test('TC-LOGIN-002 Login credenciales invalidas', async ({loginPage, page}) => {
    await allure.feature('Autenticación');
    await allure.story('Validacion de credenciales');
    await allure.severity('Normal');
    await allure.description('Resultado esperado: se muestra un mensaje de error al usar credenciales inválidas.');

await allure.step('01 - Abrir la página de login', async () => {

    await page.goto('https://www.saucedemo.com/');
    await guardarEvidencia(page, '01 - Pantalla login');
});

await allure.step('02 - Introducir credenciales invalidas', async () => {

    await loginPage.login('usuario_incorrecto', 'password_incorrecto');

    await guardarEvidencia(page, '02 - Credenciales introducida');
});

await allure.step('03 - Verificar el mensaje de error', async () => {
    const errorMessage = page.locator('[data-test="error"]')
    await expect(errorMessage).toBeVisible();
    await guardarEvidencia(page, '03 - Mensaje de error')
});

});

test('TC-LOGIN-003 - Usuario puede ver producto', async ({loggedInPage, page}) => {
    await allure.feature('Catálogo de producto');
    await allure.story('Visualizacion producto');
    await allure.severity('Normal');
    await allure.description('Resultado esperado: se muestra el título Products y seis productos.');

    await allure.step('01 - Verificar el titulo del cátalogo', async () => {

        await expect(loggedInPage.title).toHaveText('Products');
        await expect(loggedInPage.product).toHaveCount(6);
        await guardarEvidencia(page, 'Cátalogo con 6 productos');
    });
});

test('TC-LOGIN-004 - Usuario puede cerrar sesion', async ({loggedInPage, page}) => {
    await allure.feature('Autenticacion');
    await allure.story('Cerrar sesión');
    await allure.severity('Normal');
    await allure.description('Resultado esperado: al cerrar sesión, el usuario regresa a la pantalla de login.');

    await allure.step('01 - Verificar que el usuario esta en productos', async () => {
        await expect(loggedInPage.title).toHaveText('Products');
        await guardarEvidencia(page, '01 - Sesion iniciada');
    });

    await allure.step('02 - cerrar sesión', async () => {

        await loggedInPage.logout();
        await guardarEvidencia(page, '02 - Sesión cerrada');
    });

    await allure.step('03 - Verificar regreso al login', async () => {

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await guardarEvidencia(page, '03 - Regreso verificado');
    })
});