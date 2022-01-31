const router = require('express').Router()
const Tasks = require('../../model/Tasks.js')

router.route('/tasks').patch(async (req, res) => {
    let oldTasks = await Tasks.getTasks();
    oldTasks.tasks.forEach((task) => {
            if (task.id == req.body.id) {
                task.name = req.body.name;
                task.done = req.body.done;
                task.updatedAt = req.body.updatedAt;
            }
    })
    await Tasks.saveTasks(oldTasks);
    res.sendStatus(202);
})

module.exports = router;