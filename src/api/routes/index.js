const express = require('express');
parentRouter = express.Router();

const welcomeRoute = require('../routes/welcomeRoutes');
const customerRoute = require('../routes/customer.routes');
welcomeRoute(parentRouter);
customerRoute(parentRouter);

module.exports = parentRouter;
