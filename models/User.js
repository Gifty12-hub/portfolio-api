const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  github: { type: String },
  linkedin: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);