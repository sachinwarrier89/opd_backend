// models/prescriptionModel.js

const db = require('../db');

const PrescriptionModel = {
  findByPatientId: async (patientId, dateRange = {}) => {
    let query = 'SELECT * FROM prescriptions WHERE patientId = ?';
    const params = [patientId];

    if (dateRange.startDate) {
      query += ' AND date >= ?';
      params.push(dateRange.startDate);
    }

    if (dateRange.endDate) {
      query += ' AND date <= ?';
      params.push(dateRange.endDate);
    }
    console.log(query, params);

    const [rows] = await db.execute(query, params);
    return rows;
  },
  create: async (prescriptionData) => {
    const query = 'INSERT INTO prescriptions (patient_id, prescription_image_url) VALUES (?, ?)';
    const params = [prescriptionData.patientId, prescriptionData.prescriptionImageUrl];
    console.log(query, params);

    const [result] = await db.execute(query, params);
    return result.insertId;
  },
};

module.exports = PrescriptionModel;
