const router = require('express').Router();
const { query } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');
const jwt = require('jsonwebtoken');

router.route('/tasks').delete(
        query('uuid').isUUID(),
        checkError,
    async (req, res) => {
        try {
            const { uuid } = req.query;
            const decoded = jwt.verify(req.headers.authorization, 'chereshnia');
            const user_id = decoded.id;
            await db.Task.destroy({ where: { uuid, user_id } });
            res.sendStatus(202);
        } catch(err) {
            res.status(400).send(err);
        }
    }
)

module.exports = router;