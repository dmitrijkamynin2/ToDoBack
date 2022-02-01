const router = require('express').Router()
const Tasks = require('../../model/Tasks.js')

router.route('/tasks').delete(async (req, res) => {
    let oldTasks = await Tasks.getTasks();
    newTasks = {}
    newTasks.tasks = oldTasks.tasks.filter(task => task.id != req.query.id);
    await Tasks.saveTasks(newTasks);
    res.sendStatus(202);
})

module.exports = router;