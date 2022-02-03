const router = require('express').Router()
const { query } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');

router.route('/tasks').get(
        query('filterBy').isIn(['all','done','undone']),
        query('order').isIn(['asc','desc']),
        query('pp').custom(value => {
            if (value >= 5 && value <= 20) {
                return true
            } else {
                return Promise.reject('invalid range, range: not from 5 to 20');
            }
        }),
        query('page').isNumeric().bail().custom(value => {
            if (value > 0) {
                return true
            } else {
                return Promise.reject('invalid page, page: not > 0');
            }
        }),
        checkError,
    async (req, res) => {
        try {
            let filterBy;
            switch (req.query.filterBy) {
                case 'all':
                    filterBy = [true, false];
                    break;
                case 'done':
                    filterBy = true;
                    break;
                case 'undone':
                    filterBy = false;
                    break;
            }
        
            const limit = req.query.pp;
            const offset = (req.query.pp * (req.query.page - 1));
            let result = await db.Task.findAll({
                where: {
                    done: filterBy,
                },
                order: [
                    ['createdAt', req.query.order],
                ],
                limit: limit,
                offset: offset,
            });
        
            const count = await db.Task.count({
                where: {
                    done: filterBy,
                },
                order: [
                    ['createdAt', req.query.order],
                ],
            })
        
            result = {
                count: count,
                tasks: result
            }
            res.status(200);
            res.send(result);
        } catch(err) {
            res.status(500).send(err);
        }
    }
)

module.exports = router;