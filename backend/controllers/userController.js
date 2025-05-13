const User = require('../models/User');
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already exists' });
  const user = await User.create({ username, email, password });
  res.json({ token: generateToken(user._id), username: user.username });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: generateToken(user._id), username: user.username });
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  res.json({ message: 'Profile updated' });
};

exports.getUserApplications = async (req, res) => {
  const applications = await Application.find({ userId: req.user.id }).populate('petId');
  res.json(applications);
};
