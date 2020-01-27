
const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    console.log('i\'m in welcome now');
    res.send('hey! welcome here');
});

module.exports = router;
