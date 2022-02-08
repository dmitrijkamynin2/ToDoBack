const router = require('express').Router()
const { query } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');
const jwt = require('jsonwebtoken');

router.route('/tasks').get(
        query('filterBy').isIn(['all','done','undone']),
        query('order').isIn(['asc','desc']),
        query('pp').isInt({ min: 5, max: 20 }).withMessage('should be between 5 and 20'),
        query('page').isInt({ min: 1 }).withMessage('must be greater than 0'),
        checkError,
    async (req, res) => {
        try {
            const { filterBy, order, pp, page } = req.query;
            const decoded = jwt.verify(req.headers.authorization, 'chereshnia');
            const user_id = decoded.id;
            const filterByBoolean = (filterBy === 'all') ? [true, false] : (filterBy === 'done');
            const tasks = await db.Task.findAndCountAll(
                {
                    where: {
                        done: filterByBoolean,
                        user_id: user_id
                    },
                    order: [
                        ['createdAt', order],
                    ],
                    limit: pp,
                    offset: pp * (page - 1),
                }
            );
            res.status(200).send(tasks);
        } catch(err) {
            res.status(500).send(err);
        }
    }
)

module.exports = router;