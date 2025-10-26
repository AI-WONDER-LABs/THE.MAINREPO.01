/**
 * Project Funding API Tests
 */

const request = require('supertest');
const createApp = require('../src/app');

describe('Project Funding API Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('POST /api/project-funding/:projectId/funding', () => {
    it('should require authentication', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .post(`/api/project-funding/${fakeId}/funding`)
        .send({
          fundingGoal: 50000,
          fundingType: 'equity',
        })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/project-funding/:projectId/funding', () => {
    it('should require authentication', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/project-funding/${fakeId}/funding`)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/project-funding/:projectId/links', () => {
    it('should require authentication', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .post(`/api/project-funding/${fakeId}/links`)
        .send({
          website: 'https://example.com',
          social: {
            linkedin: 'https://linkedin.com/company/example',
          },
        })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/project-funding/:projectId/links', () => {
    it('should require authentication', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/project-funding/${fakeId}/links`)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
