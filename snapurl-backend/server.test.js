import request from 'supertest';
import app from './server.js';

describe('API Endpoint Tests', () => {
    test('GET / should return a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('POST to an invalid route returns 404', async () => {
        const response = await request(app).post('/this-route-does-not-exist');
        expect(response.statusCode).toBe(404);
    });
});