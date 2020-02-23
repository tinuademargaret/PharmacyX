const express = require('express');
// const config  = require('./config');
const app = express();
const server = require('./server');

server(app);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is live at port:${PORT}`));


// app.listen(config.port, '127.0.0.1', () => 
    // if (err) {
        // console.log('################################################')
        // console.log(' 🚫🚫 Error occured while trying to start server 🚫🚫', err)
        // console.log('################################################')
        // process.exit(1);
        // return;
    // }
    // console.log('################################################')
    // console.log(' 🛡️  Server listening on port: ', config.port, ' 🛡️ ')
    // console.log('################################################')
// )

