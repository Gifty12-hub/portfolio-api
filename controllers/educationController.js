const Education = require('../models/Education');

// GET all education records
const getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving education records', error: err.message });
  }
};

// GET single education record by ID
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education record not found' });
    res.status(200).json(education);
  } catch (err) {
    res.status(400).json({ message: 'Invalid education ID', error: err.message });
  }
};

// POST create new education record
const createEducation = async (req, res) => {
  try {
    const { institution, degree, fieldOfStudy, startYear, userId } = req.body;

    // Data validation
    if (!institution || typeof institution !== 'string' || institution.trim() === '') {
      return res.status(400).json({ message: 'Institution is required and must be a non-empty string' });
    }
    if (!degree || typeof degree !== 'string' || degree.trim() === '') {
      return res.status(400).json({ message: 'Degree is required and must be a non-empty string' });
    }
    if (!fieldOfStudy || typeof fieldOfStudy !== 'string' || fieldOfStudy.trim() === '') {
      return res.status(400).json({ message: 'Field of study is required and must be a non-empty string' });
    }
    if (!startYear || typeof startYear !== 'number') {
      return res.status(400).json({ message: 'startYear is required and must be a number' });
    }
    if (startYear < 1900 || startYear > new Date().getFullYear()) {
      return res.status(400).json({ message: 'startYear must be a valid year' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const education = new Education(req.body);
    const savedEducation = await education.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(400).json({ message: 'Error creating education record', error: err.message });
  }
};

// PUT update education record
const updateEducation = async (req, res) => {
  try {
    const { institution, degree, fieldOfStudy, startYear, endYear } = req.body;

    // Data validation
    if (institution !== undefined && (typeof institution !== 'string' || institution.trim() === '')) {
      return res.status(400).json({ message: 'Institution must be a non-empty string' });
    }
    if (degree !== undefined && (typeof degree !== 'string' || degree.trim() === '')) {
      return res.status(400).json({ message: 'Degree must be a non-empty string' });
    }
    if (fieldOfStudy !== undefined && (typeof fieldOfStudy !== 'string' || fieldOfStudy.trim() === '')) {
      return res.status(400).json({ message: 'Field of study must be a non-empty string' });
    }
    if (startYear !== undefined && (typeof startYear !== 'number' || startYear < 1900)) {
      return res.status(400).json({ message: 'startYear must be a valid number' });
    }
    if (endYear !== undefined && startYear !== undefined && endYear < startYear) {
      return res.status(400).json({ message: 'endYear cannot be before startYear' });
    }

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) return res.status(404).json({ message: 'Education record not found' });
    res.status(200).json(education);
  } catch (err) {
    res.status(400).json({ message: 'Error updating education record', error: err.message });
  }
};

// DELETE education record
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education record not found' });
    res.status(200).json({ message: 'Education record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting education record', error: err.message });
  }
};

module.exports = { getAllEducation, getEducationById, createEducation, updateEducation, deleteEducation };