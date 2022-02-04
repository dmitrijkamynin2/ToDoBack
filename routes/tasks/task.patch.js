const router = require('express').Router();
const { body } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');
const { Op } = require("sequelize");

router.route('/tasks').patch(
        body('name').isLength({ min: 1 }),
        body('done').isBoolean(),
        body('uuid').isUUID(),
        checkError,
    async (req, res) => {
        try {
            const {uuid, done, name} = req.body;

            // search for the same task
            const oneTask = await db.Task.findOne({
                where: {
                    name: name,
                    [Op.not]: [{uuid}],
                }
            });
            if (oneTask) throw new Error('this task already exists');

            await db.Task.update({name, done}, {where: {uuid}});

            res.sendStatus(202);
        } catch(err) {
            res.status(401).send(err.name +': '+ err.message);
        }
})

module.exports = router;