/**
 * Marketplace API Tests
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Marketplace API Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('Marketplace Routes', () => {
    it('should have marketplace routes mounted', async () => {
      const response = await request(app)
        .get('/api/marketplace/projects')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
    });

    it('should have project detail route', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/marketplace/projects/${fakeId}`)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
    });
  });
});
