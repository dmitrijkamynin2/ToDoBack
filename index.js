const express = require('express');
const config = require('./config.js');
const app = express();
const registRouter = require('./routes/regist.js');
const loginRouter = require('./routes/login.js')
var fs = require('fs');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Request-Headers', '*');
    next();
});


app.use('/regist', registRouter);
app.use('/login', loginRouter);


const routes = fs.readdirSync('./routes/tasks');
routes.forEach(route => {app.use('/api', require('./routes/tasks/'+route))});

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
console.log(`Server is listening port ${PORT}`) 
})