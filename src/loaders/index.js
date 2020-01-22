const mysqlLoader = require('./database');

module.exports = async(expressApp)=>{
    const mysqlconnection = await mysqlLoader();
    console.log('db is connected')

}