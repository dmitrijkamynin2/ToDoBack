const router = require('express').Router()
const Tasks = require('../../model/Tasks.js')
const { v4 } = require('uuid');

router.route('/tasks').post(async (req, res) => {
    let oldTasks = await Tasks.getTasks();
    newTask = req.body;
    newTask.id = v4();
    oldTasks.tasks.push(newTask);
    await Tasks.saveTasks(oldTasks);
    res.status(201);
    res.send(newTask);
})

module.exports = router;