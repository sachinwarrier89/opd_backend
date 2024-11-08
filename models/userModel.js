// models/userModel.js

const db = require('../db');
const config = require('../config');

const UserModel = {
  findByUsername: async (username) => {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.execute(`SELECT name, timings, address, meta, concat('${config.baseUrl}', logo) as logo FROM users WHERE id = ?`, [id]);
    return rows[0];
  },

  create: async (userData) => {
    const {
      username,
      hashedPassword,
      name,
      timings,
      address,
      meta,
      logo,
    } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (username, password, name, timings, address, meta, logo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, timings, address, meta, logo]
    );
    return result.insertId;
  },

  // Add other necessary methods if needed
};

module.exports = UserModel;
