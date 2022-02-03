const router = require('express').Router();
const { body } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');
const { Op } = require("sequelize");

router.route('/tasks').patch(
        body("name")
            .isLength({ min: 1 }),
        body("done")
            .isBoolean(),
        body("uuid")
            .isUUID(),
        checkError,
    async (req, res) => {
        try {
            // search for the same task
            const oneTask = await db.Task.findAll({
                where: {
                    name: req.body.name,
                    [Op.not]: [{uuid: req.body.uuid}],
                }
            });
            if (oneTask.length > 0) {
                throw new Error('this task already exists');
            }

            const result = await db.Task.findOne({
                where:{
                    uuid: req.body.uuid,
                }
            });
            result.done = req.body.done ?? result.done;
            result.name = req.body.name ?? result.name;
            await result.save();
            res.status(202).send(result);
        } catch(err) {
            res.status(401).send(err.name +': '+ err.message);
        }
})

module.exports = router;