import app from '../index';
import supertest from 'supertest';

describe('main app', () => {
    const request = supertest(app);

    it('should return 200 and a welcome message for the root endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('should return 404 for an invalid endpoint', async () => {
        const response = await request.get('/invalid');
        expect(response.status).toBe(404);
    });
});
