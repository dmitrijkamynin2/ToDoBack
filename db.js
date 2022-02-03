const {Sequelize, DataTypes } = require('sequelize');
const getTaskModel = require('./models/task.js')

const sequelize = new Sequelize('tasks', 'dmitrij', 'user', {
    host: 'localhost',
    dialect: 'postgres'
});

const Task = getTaskModel(sequelize, DataTypes);

module.exports = Task;


