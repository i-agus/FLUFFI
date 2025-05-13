const Application = require('../models/Application');

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('petId');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createApplication = async (req, res) => {
  const { petId, message } = req.body;
  const application = await Application.create({
    petId,
    userId: req.user.id,
    status: 'Pending',
    message
  });
  res.json(application);
};
