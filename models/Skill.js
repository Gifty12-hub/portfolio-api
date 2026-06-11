const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], required: true },
  yearsOfExperience: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);