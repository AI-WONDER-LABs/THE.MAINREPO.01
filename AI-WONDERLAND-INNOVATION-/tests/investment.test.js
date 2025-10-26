/**
 * Investment API Tests
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Investment API Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('POST /api/investments', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/investments')
        .send({
          projectId: '507f1f77bcf86cd799439011',
          amount: 1000,
          paymentMethod: 'stripe',
        })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/investments/dashboard', () => {
    it('should require authentication', async () => {
      const response = await request(app).get('/api/investments/dashboard').expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/investments/:id', () => {
    it('should require authentication', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/api/investments/${fakeId}`).expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
