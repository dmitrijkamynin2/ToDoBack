const router = require('express').Router()
const { checkTask } = require('../../model/Tasks.js');
const Tasks = require('../../model/Tasks.js')

router.route('/tasks').patch(async (req, res) => {
    try {
        let oldTasks = await Tasks.getTasks();
        const checkOldTasks = oldTasks.tasks.filter(task => task.name === req.body.name);
        if ((checkOldTasks.length == 0) || (checkOldTasks[0].id === req.body.id)) {
            oldTasks.tasks.forEach((task) => {
                    if (task.id == req.body.id) {
                        task.name = req.body.name;
                        task.done = req.body.done;
                    }
            })
            await Tasks.saveTasks(oldTasks);
            res.sendStatus(202);
        } else {
            throw new Error('this name tasks already in use');
        }
    } catch (err) {
        res.status(401).send(err);
        // res.send(err);
    }

})

module.exports = router;