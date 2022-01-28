let Data = require('../../Data.js')

const postTasks = (req) => {
    Data.tasks.forEach((task) => {
        if (task.id == req.body.id) {
            task.name = req.body.name;
            task.done = req.body.done;
            task.updatedAt = req.body.updatedAt;
        }
    })
}

module.exports = postTasks