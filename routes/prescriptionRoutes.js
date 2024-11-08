// routes/prescriptionRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const PrescriptionController = require('../controllers/prescriptionController');

router.get('/:patientId', authenticate, PrescriptionController.getPrescriptions);
router.post('/save', authenticate, PrescriptionController.savePrescription);

module.exports = router;
