const router = require('express').Router()
const Task = require('../../db.js');

router.route('/tasks').delete(async (req, res) => {
    try {
        await Task.destroy({
            where:{
                uuid: req.query.id,
            }
        });
        res.sendStatus(202);
    } catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;