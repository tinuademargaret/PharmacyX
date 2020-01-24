const express = require('express')
router = express.Router()

router.get('/welcome', (req,res) => {
    console.log('I got here')
    res.send('hey! welcome here');
})
module.exports = router;
