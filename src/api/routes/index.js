const express = require('express');
parentRouter = express.Router();

const welcomeRoute = require('../routes/welcomeRoutes');
welcomeRoute(parentRouter);

module.exports = parentRouter;
