const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

jest.mock('../models/Education');
const Education = require('../models/Education');

// Mock isAuthenticated so protected routes don't block GET tests
jest.mock('../middleware/isAuthenticated', () => (req, res, next) => next());

app.use('/education', require('../routes/education'));

describe('Education GET Endpoints', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /education/', () => {
    it('should return 200 and an array of education records', async () => {
      Education.find.mockResolvedValue([
        { _id: '64f1a2b3c4d5e6f7a8b9c0d1', institution: 'BYU-Idaho', degree: 'BSc', fieldOfStudy: 'Web Development', startYear: 2021 },
        { _id: '64f1a2b3c4d5e6f7a8b9c0d2', institution: 'University of Ghana', degree: 'BSc', fieldOfStudy: 'Computer Science', startYear: 2018 }
      ]);

      const res = await request(app).get('/education/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should return 200 and empty array when no records exist', async () => {
      Education.find.mockResolvedValue([]);

      const res = await request(app).get('/education/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return 500 if database throws an error', async () => {
      Education.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/education/');
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /education/:id', () => {
    it('should return 200 and a single education record when found', async () => {
      const mockEducation = { _id: '64f1a2b3c4d5e6f7a8b9c0d1', institution: 'BYU-Idaho', degree: 'BSc', fieldOfStudy: 'Web Development', startYear: 2021 };
      Education.findById.mockResolvedValue(mockEducation);

      const res = await request(app).get('/education/64f1a2b3c4d5e6f7a8b9c0d1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('institution', 'BYU-Idaho');
    });

    it('should return 404 when education record is not found', async () => {
      Education.findById.mockResolvedValue(null);

      const res = await request(app).get('/education/64f1a2b3c4d5e6f7a8b9c0d9');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Education record not found');
    });

    it('should return 400 for an invalid ID format', async () => {
      Education.findById.mockRejectedValue(new Error('Cast to ObjectId failed'));

      const res = await request(app).get('/education/invalid-id');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});