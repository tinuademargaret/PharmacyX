const express = require('express');
const router = express.Router();


module.exports = (parentRouter) => {
    router.get('/greet', (req,res,next) => {
        res.send('hey! welcome here');
    });
    parentRouter.use('/welcome', router);
}