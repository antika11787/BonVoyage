const dotenv = require("dotenv");
dotenv.config();

const appConfig = {
  databaseUrl: process.env.DATABASE_URL??'mongodb://localhost:27017/test-db',
  jwtSecret: process.env.JWT_SECRET??'JWT_SECRET'
};

export default appConfig;