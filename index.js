const express = require('express');
const config = require('./config.js');
const router = require('./router.js');
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(config.url, router);


const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`)
})