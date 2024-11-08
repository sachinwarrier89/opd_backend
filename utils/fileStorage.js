// utils/fileStorage.js

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const config = require('../config');

const FileStorage = {};

if (config.storage.provider === 's3') {
  // AWS S3 Configuration
  const s3 = new AWS.S3({
    accessKeyId: config.storage.s3.accessKeyId,
    secretAccessKey: config.storage.s3.secretAccessKey,
    region: config.storage.s3.region,
  });

  FileStorage.savePrescriptionImage = async (userId, patientId, base64Image) => {
    const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const fileName = `prescription_${Date.now()}.png`;

    const params = {
      Bucket: config.storage.s3.bucket,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/png',
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // S3 URL
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  };
} else {
  // Local Storage Configuration
  FileStorage.savePrescriptionImage = async (userId, patientId, base64Image) => {
    const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const fileName = `${patientId}_prescription_${Date.now()}.png`;
    const uploadDir = `${config.storage.local.uploadDir}/${userId}/prescriptions/`;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    try {
      fs.writeFileSync(filePath, buffer);
      const imageUrl = `/uploads/${fileName}`; // URL to access the image
      return imageUrl;
    } catch (error) {
      console.error('File save error:', error);
      throw error;
    }
  };
}

module.exports = FileStorage;
