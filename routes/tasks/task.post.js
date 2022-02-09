const router = require('express').Router()
const { body } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');
const jwt = require('jsonwebtoken');

router.route('/tasks').post(
        body('name').isLength({ min: 1 }),
        body('done').isBoolean(),
        checkError,
    async (req, res) => {
        try{
            const {name, done} = req.body;
            const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const user_id = decoded.id;
            console.log(user_id);
            // search for the same task
            const oneTask = await db.Task.findOne({ where: { name, user_id } });
            if (oneTask) throw new Error('this task already exists');

            const newTask = await db.Task.create({name, done, user_id});
            
            res.status(201).send(newTask);
        } catch (err) {
            res.status(400).send(err.name +': '+ err.message);
        }
})

module.exports = router;