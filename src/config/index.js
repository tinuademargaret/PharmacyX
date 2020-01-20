const dotenv = require('dotenv');
const envFound = dotenv.config({path: `.env`});

if (!envFound) {

  // This error should crash whole process

  throw new Error('⚠️  Couldn\'t find .env file  ⚠️')
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT,10),

  /**
   * Database Host
   */
  db_host: process.env.DB_HOST,

  /**
   * Database Host
   */
  db_user: process.env.DB_USER,

  /**
   * Database Host
   */
  db_password: process.env.DB_PASSWORD,

  /**
   * Database Host
   */
  db_name: process.env.DB_NAME,
  
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
}