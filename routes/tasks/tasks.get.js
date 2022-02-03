const router = require('express').Router()
const Task = require('../../db.js');

router.route('/tasks').get(async (req, res) => {
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
        let result = await Task.findAll({
            where: {
                done: filterBy,
            },
            order: [
                ['createdAt', req.query.order],
            ],
            limit: limit,
            offset: offset,
        });
    
        const count = await Task.count({
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

})

module.exports = router;