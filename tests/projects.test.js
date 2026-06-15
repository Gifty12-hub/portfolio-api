const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

jest.mock('../models/Project');
const Project = require('../models/Project');

// Mock isAuthenticated so protected routes don't block GET tests
jest.mock('../middleware/isAuthenticated', () => (req, res, next) => next());

app.use('/projects', require('../routes/projects'));

describe('Projects GET Endpoints', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /projects/', () => {
    it('should return 200 and an array of projects', async () => {
      Project.find.mockResolvedValue([
        { _id: '64f1a2b3c4d5e6f7a8b9c0d1', title: 'Portfolio API', description: 'REST API', techStack: ['Node.js'], status: 'completed' },
        { _id: '64f1a2b3c4d5e6f7a8b9c0d2', title: 'E-commerce App', description: 'Shop app', techStack: ['React'], status: 'in-progress' }
      ]);

      const res = await request(app).get('/projects/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return 200 and empty array when no projects exist', async () => {
      Project.find.mockResolvedValue([]);

      const res = await request(app).get('/projects/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return 500 if database throws an error', async () => {
      Project.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/projects/');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /projects/:id', () => {
    it('should return 200 and a single project when found', async () => {
      const mockProject = { _id: '64f1a2b3c4d5e6f7a8b9c0d1', title: 'Portfolio API', description: 'REST API', techStack: ['Node.js'], status: 'completed' };
      Project.findById.mockResolvedValue(mockProject);

      const res = await request(app).get('/projects/64f1a2b3c4d5e6f7a8b9c0d1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Portfolio API');
    });

    it('should return 404 when project is not found', async () => {
      Project.findById.mockResolvedValue(null);

      const res = await request(app).get('/projects/64f1a2b3c4d5e6f7a8b9c0d9');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Project not found');
    });

    it('should return 400 for an invalid ID format', async () => {
      Project.findById.mockRejectedValue(new Error('Cast to ObjectId failed'));

      const res = await request(app).get('/projects/invalid-id');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});