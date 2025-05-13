const Shelter = require('../models/Shelter');
const Pet = require('../models/Pet');

exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    const pets = await Pet.find({ shelterId: req.params.id });
    res.json({ ...shelter._doc, pets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createShelter = async (req, res) => {
  try {
    const shelter = new Shelter(req.body);
    await shelter.save();
    res.status(201).json(shelter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(shelter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteShelter = async (req, res) => {
  try {
    await Shelter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shelter deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
