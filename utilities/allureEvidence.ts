import {Page} from '@playwright/test';
import * as allure from 'allure-js-commons';

export async function guardarEvidencia(page:Page, nombre: string): Promise<void> {
    const captura = await page.screenshot({
        fullPage: true
    }); 

    await allure.attachment(nombre, captura, {
        contentType: 'image/png'
    }); 
}
