const { query, body, validationResult } = require('express-validator');
const routerValid = require('express').Router()

routerValid.route('/tasks')
    .post(
        // body("name")
        //     .isLength({ min: 1 })
        //     .custom(value => {
        //         return Tasks.checkTask(value).then(task => {
        //         if (task) {
        //             return Promise.reject('this name tasks already in use');
        //         }
        //         });
        //     }),
        // body("done")
        //     .isBoolean(),
        // body("createdAt")
        //     .custom(value => {
        //         if (new Date(value) == 'Invalid Date') {
        //             return Promise.reject('Invalid Date');
        //         }
        //         return true
        //     }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ).patch(
        // body("name")
        //     .isLength({ min: 1 }),
        // body("done")
        //     .isBoolean(),
        // body("id")
        //     .isUUID()
        //     .custom(value => {
        //         return Tasks.checkTaskId(value).then(task => {
        //         if (!task) {
        //             return Promise.reject('not task with this id');
        //         }
        //         });
        //     }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ).delete(
        // query('id')
        //     .isUUID()
        //     .custom(value => {
        //         return Tasks.checkTaskId(value).then(task => {
        //         if (task.length === 0) {
        //             return Promise.reject('not task with this id');
        //         }
        //         });
        //     }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ).get(
        // query('filterBy').isIn(['all','done','undone']),
        // query('order').isIn(['asc','desc']),
        // query('pp').custom(value => {
        //     if (value >= 5 && value <= 20) {
        //         return true
        //     } else {
        //         return Promise.reject('invalid range');
        //     }
        // }),
        // query('page').isNumeric().bail().custom(value => {
        //     if (value > 0) {
        //         return true
        //     } else {
        //         return Promise.reject('invalid page');
        //     }
        // }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    )

module.exports = routerValid;