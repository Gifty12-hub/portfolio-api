const Project = require('../models/Project');

// GET all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects', error: err.message });
  }
};

// GET single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: 'Invalid project ID', error: err.message });
  }
};

// POST create new project
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, status, userId } = req.body;

    // Data validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and must be a non-empty string' });
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Description is required and must be a non-empty string' });
    }
    if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
      return res.status(400).json({ message: 'techStack is required and must be a non-empty array' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const validStatuses = ['in-progress', 'completed', 'archived'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${validStatuses.join(', ')}` });
    }

    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
};

// PUT update project
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, status } = req.body;

    // Data validation
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ message: 'Title must be a non-empty string' });
    }
    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      return res.status(400).json({ message: 'Description must be a non-empty string' });
    }
    if (techStack !== undefined && (!Array.isArray(techStack) || techStack.length === 0)) {
      return res.status(400).json({ message: 'techStack must be a non-empty array' });
    }
    const validStatuses = ['in-progress', 'completed', 'archived'];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${validStatuses.join(', ')}` });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
};

// DELETE project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };