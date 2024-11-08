// controllers/patientController.js

const PatientModel = require('../models/patientModel');
const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();

const PatientController = {
  getPatients: async (req, res) => {
    try {
      const filters = req.query;
      const userId = req.user.id;
      const patients = await PatientModel.find(userId, filters);
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  createPatient: async (req, res) => {
    try {
      const patientData = req.body;
      const patientId = await PatientModel.create(patientData);
      res.json({ id: patientId, ...patientData });
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  recognizeText: async (req, res) => {
    res.json({ text: "Sachin" });
    // const { image } = req.body;

    // try {
    //   // Run text detection on the image
    //   const [result] = await visionClient.textDetection({ image: { content: image } });
    //   const detectedText = result.fullTextAnnotation ? result.fullTextAnnotation.text : '';

    //   res.json({ text: detectedText });
    // } catch (error) {
    //   console.error('Text recognition error:', error);
    //   res.status(500).json({ message: 'Failed to recognize text' });
    // }
  }
};

module.exports = PatientController;
