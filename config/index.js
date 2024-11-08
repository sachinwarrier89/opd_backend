// config/index.js

const path = require('path');
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  app: {
    port: process.env.PORT || 3001,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '1h',
  },
  db: {
    connectionLimit: 10,
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local', // 'local' or 's3'
    local: {
      uploadDir: path.join(__dirname, '..', 'uploads'),
    },
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_BUCKET_NAME,
    },
  },
};

const envConfig = require(`./${env}.js`);
module.exports = { ...baseConfig, ...envConfig };
