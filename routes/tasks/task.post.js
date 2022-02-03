const router = require('express').Router()
const { body } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');

router.route('/tasks').post(
        body("name")
            .isLength({ min: 1 }),
        body("done")
            .isBoolean(),
        checkError,
    async (req, res) => {
        try{
            // search for the same task
            const oneTask = await db.Task.findAll({
                where: {
                    name: req.body.name,
                }
            });
            if (oneTask.length > 0) {
                throw new Error('this task already exists');
            };

            await db.Task.create({name: req.body.name, done: req.body.done});
            const newTask = req.body;
            res.status(201);
            res.send(newTask);  
        } catch (err) {
            res.status(400).send(err);
        }
})

module.exports = router;