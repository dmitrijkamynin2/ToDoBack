const express = require('express');
let router = express.Router();
const getTasks = require('./routes/tasks/getTasks.js');
const deleteTasks = require('./routes/tasks/deleteTasks.js');
const postTasks = require('./routes/tasks/postTasks.js');
const patchTasks = require('./routes/tasks/patchTasks.js');


router
    .route("/tasks")
    .get((req, res) => {
        res.send(getTasks(req));
    })
    .delete((req, res) => {
        deleteTasks(req);
        res.sendStatus(200);
    })
    .post((req, res) => {
        postTasks(req);
        res.sendStatus(201);
    })
    .patch((req, res) => {
        patchTasks(req);
        res.send(201);
    })

module.exports = router;