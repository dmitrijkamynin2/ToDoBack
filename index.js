const express = require('express');
const config = require('./config.js');
const app = express();
const routerValid = require('./validation/validationTasks.js');
var fs = require('fs');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', routerValid);

const routes = fs.readdirSync('./routes/tasks');
routes.forEach(route => {app.use('/api', require('./routes/tasks/'+route))});

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`)
})