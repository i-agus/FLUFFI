const Pet = require('../models/Pet');
const fs = require('fs');
const path = require('path');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('shelterId');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('shelterId');
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addPet = async (req, res) => {
  try {
    // Save pet to MongoDB
    const newPet = await Pet.create(req.body);

    // Prepare the Python code to append
    const petPython = `
pets.insert_one({
    "name": "${newPet.name}",
    "age": ${newPet.age},
    "breed": "${newPet.breed}",
    "type": "${newPet.type}",
    "gender": "${newPet.gender}",
    "status": "${newPet.status}",
    "description": "${newPet.description}",
    "image": "${newPet.image}",
    "shelterId": "${newPet.shelterId}"
})
`;

    // Path to data.py
    const dataPyPath = path.join(__dirname, '../data.py');

    // Append to data.py
    fs.appendFileSync(dataPyPath, petPython);

    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
