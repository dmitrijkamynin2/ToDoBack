const router = require('express').Router();
const { body } = require('express-validator');
const db = require('../models/index.js');
const checkError = require('../checkErrorValidation/checkError.js');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

router.route('/api/tasks').patch(
        body('name').isLength({ min: 1 }),
        body('done').isBoolean(),
        body('uuid').isUUID(),
        checkError,
    async (req, res) => {
        try {
            const {uuid, done, name} = req.body;
            const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const user_id = decoded.id;
            // search for the same task
            const oneTask = await db.Task.findOne({
                where: {
                    name: name,
                    user_id: user_id,
                    [Op.not]: [{uuid}],
                }
            });
            if (oneTask) throw new Error('this task already exists');
            await db.Task.update({name, done}, {where: {uuid, user_id}});

            res.sendStatus(202);
        } catch(err) {
            res.status(400).send(err.message);
        }
})

module.exports = router;