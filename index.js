const express = require('express');
const config = require('./config.js');
const app = express();
const routerValid = require('./validation/validationTasks.js');
var fs = require('fs');


    // const Task = sequelize.define('task', {
    //     name: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    //     },
    //     done: {
    //     type: DataTypes.BOOLEAN
    //     }
    // }, {
    //     tableName: 'task'
    // });

    // const result = await Task.findAll();
    // result.map(item => console.log(item.task.dataValues))

    // await Task.create({ id: 1, name: "Jane", done: "true"});
    // await sequelize.close();  
    // }

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Validation
app.use('/api', routerValid);

const routes = fs.readdirSync('./routes/tasks');
routes.forEach(route => {app.use('/api', require('./routes/tasks/'+route))});

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
console.log(`Server is listening port ${PORT}`) 
})