const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  liveUrl: { type: String },
  githubUrl: { type: String },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'archived'],
    default: 'in-progress',
    required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);