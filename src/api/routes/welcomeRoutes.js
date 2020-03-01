const express = require('express');
const route = express.Router();


module.exports = (parentRouter) => {
    route.get('/greet', (req,res,next) => {
        res.send('hey! welcome here');
    });
    parentRouter.use('/welcome', route);
}