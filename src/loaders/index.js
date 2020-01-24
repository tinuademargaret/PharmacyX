const mysqlLoader = require('./database');
const expressLoader = require('./express')

module.exports = async(expressApp)=>{
    const mysqlconnection = await mysqlLoader();
    console.log('db is connected')
    await expressLoader(expressApp);
    console.log('Express loaded');
}