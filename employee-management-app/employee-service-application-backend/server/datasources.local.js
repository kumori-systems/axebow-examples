
require("dotenv").config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;


module.exports = {
  db: {
    name: 'db',
    connector: 'memory'
  },
  'mongodb-employee-and-department': {
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || '27017',
    url: '',
    database: 'employee-and-department',
    password: process.env.DB_PASSWORD || '12341234',
    name: 'mongodb-employee-and-department',
    user: process.env.DB_USER || 'db-user',
    connector: 'loopback-connector-mongodb'
  }
};


