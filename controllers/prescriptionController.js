// controllers/prescriptionController.js

const PrescriptionModel = require('../models/prescriptionModel');
const FileStorage = require('../utils/fileStorage');

const PrescriptionController = {
  getPrescriptions: async (req, res) => {
    const { patientId } = req.params;
    const { startDate, endDate } = req.query;
    try {
      const dateRange = { startDate, endDate };
      const prescriptions = await PrescriptionModel.findByPatientId(patientId, dateRange);
      res.json(prescriptions);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  savePrescription: async (req, res) => {
    const { patientId, prescriptionData } = req.body;
    const userId = req.user.id;

    try {
      // Save the prescription image and get the file path or URL
      const imageUrl = await FileStorage.savePrescriptionImage(userId, patientId, prescriptionData);

      // Store the prescription in the database with the associated patient ID
      const prescriptionId = await PrescriptionModel.create({ patientId, prescriptionImageUrl: imageUrl });

      res.json({ id: prescriptionId, patientId, prescriptionImageUrl: imageUrl });
    } catch (error) {
      console.error('Error saving prescription:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = PrescriptionController;
