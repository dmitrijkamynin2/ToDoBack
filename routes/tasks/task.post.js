const router = require('express').Router()
const Task = require('../../db.js');

router.route('/tasks').post(async (req, res) => {
    try{
        await Task.create({name: req.body.name, done: req.body.done});
        newTask = req.body;
        res.status(201);
        res.send(newTask);  
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;