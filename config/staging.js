// config/staging.js

module.exports = {
  db: {
    host: 'database-1.chyyikkuw5qb.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'abcd1234',
    database: 'opd_database',
  },
  baseUrl: "http://backend-alb-2115842921.ap-south-1.elb.amazonaws.com",
};
