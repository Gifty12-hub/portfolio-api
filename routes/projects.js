const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectsController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', isAuthenticated, createProject);
router.put('/:id', isAuthenticated, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;