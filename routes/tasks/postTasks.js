let Data = require('../../Data.js')
const { v4 } = require('uuid');

const postTasks = (req) => {
    Data.tasks.push({...req.body, "id": v4()});
}

module.exports = postTasks