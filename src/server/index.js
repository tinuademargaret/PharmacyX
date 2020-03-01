
const bodyParser =  require('body-parser');
const cors =  require('cors');
const expressValidator =  require('express-validator');

const routes = require('../api/routes');



function startServer(app){
    //mount third party middleware on app
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // app.use(expressValidator());
    // Health check endpoints
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    //set response content type
    app.use((req, res, next) => {
        res.setHeader("Content-Type", "application/json");
        next();
    });
    //mount the parent route on app
    app.use('/', routes);

    //do other interesting thing to the app

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({
                "error": {
                    name: "UnauthorizedError",
                    status: 401,
                    code: "AUT_02",
                    message: err.message,
                    field: "token"
                }
            }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            "error": {
                name: err.name,
                status: err.status,
                code: err.code,
                message: err.message,
                field: err.field
            }
        });
    });
}


module.exports = startServer;