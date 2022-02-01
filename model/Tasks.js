const fs = require('fs')

class Tasks {

    saveTasks = async function(data) {
        await fs.promises.writeFile('./model/data.txt', JSON.stringify(data), () => {});
    }

    getTasks = async function() {
        let oldTask = await fs.promises.readFile('./model/data.txt', 'utf-8', () => {});
        if (oldTask === '') {
            oldTask = {tasks: []}
        } else {
            oldTask = await JSON.parse(oldTask)
        }
        return oldTask
    }

    checkTask = async function (name) {
        const checkingTasks = await this.getTasks();
        const result = checkingTasks.tasks.find((task => task.name === name));
        // console.log(checkingTasks);
        return result; 
    }

}

module.exports = new Tasks();