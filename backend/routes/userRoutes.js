const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getUserApplications } = require('../controllers/userController');
const { protect } = require('../middleware/userAuth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/applications', protect, getUserApplications);

module.exports = router;
