const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Build a minimal test app (no DB needed for mocked tests)
const app = express();
app.use(express.json());

// Mock the User model
jest.mock('../models/User');
const User = require('../models/User');

app.use('/users', require('../routes/users'));

describe('Users GET Endpoints', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /users/', () => {
    it('should return 200 and an array of users', async () => {
      User.find.mockResolvedValue([
        { _id: '64f1a2b3c4d5e6f7a8b9c0d1', name: 'Gifty Mensah', email: 'gifty@example.com', title: 'Developer' },
        { _id: '64f1a2b3c4d5e6f7a8b9c0d2', name: 'Jane Doe', email: 'jane@example.com', title: 'Designer' }
      ]);

      const res = await request(app).get('/users/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return 200 and an empty array when no users exist', async () => {
      User.find.mockResolvedValue([]);

      const res = await request(app).get('/users/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return 500 if database throws an error', async () => {
      User.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/users/');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 and a single user when found', async () => {
      const mockUser = { _id: '64f1a2b3c4d5e6f7a8b9c0d1', name: 'Gifty Mensah', email: 'gifty@example.com', title: 'Developer' };
      User.findById.mockResolvedValue(mockUser);

      const res = await request(app).get('/users/64f1a2b3c4d5e6f7a8b9c0d1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Gifty Mensah');
    });

    it('should return 404 when user is not found', async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app).get('/users/64f1a2b3c4d5e6f7a8b9c0d9');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 400 for an invalid ID format', async () => {
      User.findById.mockRejectedValue(new Error('Cast to ObjectId failed'));

      const res = await request(app).get('/users/invalid-id');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});