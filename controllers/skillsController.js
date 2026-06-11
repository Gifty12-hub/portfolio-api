const Skill = require('../models/Skill');

// GET all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving skills', error: err.message });
  }
};

// GET single skill by ID
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (err) {
    res.status(400).json({ message: 'Invalid skill ID', error: err.message });
  }
};

// POST create new skill
const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ message: 'Error creating skill', error: err.message });
  }
};

// PUT update skill
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (err) {
    res.status(400).json({ message: 'Error updating skill', error: err.message });
  }
};

// DELETE skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skill', error: err.message });
  }
};

module.exports = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };