// backend/models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  type: String,
  gender: String,
  status: { type: String, default: 'Available' },
  description: String,
  image: String,
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' }
});

module.exports = mongoose.model('Pet', petSchema);
