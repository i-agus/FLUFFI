// backend/models/Shelter.js
const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Shelter', shelterSchema);
