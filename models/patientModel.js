// models/patientModel.js

const db = require('../db');

const PatientModel = {
  find: async (doctorId, filters) => {
   searchQuery = filters.query;
    let query = 'SELECT * FROM patients WHERE doctor_id = ?';
    const params = [doctorId]; // Start with doctor_id as the first parameter

    if (searchQuery) {
      // Add conditions for name, age, and contact_number based on searchQuery
      query += ` AND (
        LOWER(name) LIKE LOWER(?) OR
        CAST(age AS CHAR) LIKE ? OR
        LOWER(contact_number) LIKE LOWER(?)
      )`;
      params.push(`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`);
    }

    console.log(query, params); // For debugging
    const [rows] = await db.execute(query, params);
    return rows;
  },

  create: async (patientData) => {
    const query = 'INSERT INTO patients (doctor_id, name, age, contact_number) VALUES (?, ?, ?, ?)';
    const params = [patientData.doctorId, patientData.name, patientData.age, patientData.contactNumber];
    console.log(query, params); // For debugging
    const [result] = await db.execute(query, params);
    return result.insertId;
  },
};

module.exports = PatientModel;
