const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect } = require('../middleware/userAuth');

router.get('/', applicationController.getAllApplications);
router.post('/', protect, applicationController.createApplication);
router.put('/:id', applicationController.updateApplicationStatus);

module.exports = router;
