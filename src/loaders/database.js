var mysql = require('mysql')
const config = require('../config')
let connection;

async function dbConnection(){
    try{
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'dbuser',
            password: 'iou',
            database: 'pharmacyX'
          }); return connection;
        }catch(error){
            console.error(error)
            process.exit(1)
        }

}
module.exports = dbConnection;
