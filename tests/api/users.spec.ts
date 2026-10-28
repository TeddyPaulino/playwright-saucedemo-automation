
import { request } from '@playwright/test';
import {test, expect} from '../../fixtures/test.fixture';

test('API-001 - Consultar usuario por ID', async ({request}) => {
    const response = await request.get( 'https://jsonplaceholder.typicode.com/users/1');

    expect(response.status()).toBe(200);
    const user = await response.json();

    expect(user.id).toBe(1);
    expect(typeof user.name).toBe('string');
    expect(typeof user.username).toBe('string')
    expect(typeof user.email).toBe('string');  
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

    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();

    expect(typeof body).toBe('object');
    expect(body).not.toBeNull();
    expect(Array.isArray(body)).toBe(false);
});

test('API-004 - Crear usuario', async ({request}) => {
    const newUser = {
        name: 'QA Automation Tester',
        userName: 'qa_tester',
        email: 'qa.tester@example.com'
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/users',{data: newUser});

    const createUser = await response.json();
    expect(createUser.id).toBeDefined();
    expect(typeof createUser.id).toBe('number');
    expect(createUser.name).toBe(newUser.name);
    expect(createUser.userName).toBe(newUser.userName);
    expect(createUser.email).toBe(newUser.email)

    
});

test('API-005 - Actualizar usuario', async ({request}) => {
    const updateUser = {
        id: 1,
        name: 'QA Automation Tester Updated',
        userName: 'qa_tester_updated',
        email: 'qa.updated@example.com'
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {data: updateUser});

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(updateUser.id);
    expect(user.name).toBe(updateUser.name);
    expect(user.userName).toBe(updateUser.userName);
    expect(user.email).toBe(updateUser.email);
});

test('API-006 - Eliminar usuario', async ({request}) => {
    const response = await request.delete( 'https://jsonplaceholder.typicode.com/users/1');
    expect(response.status()).toBe(200);
})