let Data = require('../../Data.js')

const deleteTasks = (req) => {
    console.log(req.query.id);
    Data.tasks = Data.tasks.filter((task) => task.id != req.query.id);
}

module.exports = deleteTasks