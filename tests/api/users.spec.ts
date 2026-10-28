
import { request } from '@playwright/test';
import {test, expect} from '../../fixtures/test.fixture';

test('API-001 - Consultar usuario por ID', async ({request}) => {
    const response = await request.get( 'https://jsonplaceholder.typicode.com/users/1');

    expect(response.status()).toBe(200);
    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
});

test("API-002 = Consulta lista de usuarios", async ({request}) => {
    const response = await request.get( 'https://jsonplaceholder.typicode.com/users');

    expect(response.status()).toBe(200);

    const users = await response.json();

    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
});

test('API-003 - Validar endpoint inexistente', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/this-resource-does-not-exist');

    expect(response.status()).toBe(404);
})