const request = require('supertest');
// Import your express app. 
// Note: You must export 'app' from server.js for this to work (e.g., module.exports = app;)
const app = require('./server'); 

describe('API Endpoint Tests', () => {
    test('GET / should return a 200 status code', async () => {
        const response = await request(app).get('/');
        
        // This is a real assertion testing your actual server code
        expect(response.statusCode).toBe(200);
    });

    test('POST to an invalid route returns 404', async () => {
        const response = await request(app).post('/this-route-does-not-exist');
        expect(response.statusCode).toBe(404);
    });
});