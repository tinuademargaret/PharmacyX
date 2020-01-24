// middlewares
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');

const routes = require('../../src/routes');
const config = require('../config');

module.exports = async(expressApp)=>{
    const app = expressApp;

    //check app status
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    //set response content type
    app.use((req, res, next) => {
        res.setHeader("Content-Type", "application/json");
    });
    // allows cross origin communication
    app.use(cors());
    // allows app use to use HTTP verbs such as PUT in places where the client doesn't support it
    app.use(methodOverride());
    // turns raw string of req.body to Json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({'extended':true}));
    
    // load routes
    // app.use('/', routes);
    // cath 404 error
    app.use((req,res,next) =>{
        const err = new Error('Route not found');
        err.status = 404;
        err.code = 'RNF_01';
        err.field = 'api path';
        next(err);
    });
    // error handlers
    app.use((err,req,res,next) => {
        if (err.name === 'UnauthorizedError'){
            return res.status(err.status).send({
                "error":{
                    name:"UnauthorizedError",
                    status: 401,
                    code: "AUT_02",
                    message: err.message,
                    field: "token"
                }
            }) .end();      
         }
        return next(err);
    });
    app.use((err, req, res, next) =>{
        res.status(err.status||500);
        res.json({
            error:{
                name: err.name,
                status: err.status,
                code: err.code,
                message: err.message,
                field: err.field
            }
        });
    });


}