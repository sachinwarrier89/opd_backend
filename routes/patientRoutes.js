// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const PatientController = require('../controllers/patientController');

router.get('/search', authenticate, PatientController.getPatients);
router.post('/', authenticate, PatientController.createPatient);
router.post('/recognize-text', PatientController.recognizeText);


module.exports = router;
