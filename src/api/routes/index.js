const express = require('express');
parentRouter = express.Router();

const welcomeRoute = require('../routes/welcomeRoutes');
const customerRoute = require('../routes/customer.routes');
const adminRoute = require('../routes/admin.routes');
const productRoute = require('../routes/product.routes');
const categoryRoute = require('../routes/category.routes');
const cartRoute = require('../routes/cart.routes');
welcomeRoute(parentRouter);
customerRoute(parentRouter);
adminRoute(parentRouter);
productRoute(parentRouter);
categoryRoute(parentRouter);
cartRoute(parentRouter);

module.exports = parentRouter;
