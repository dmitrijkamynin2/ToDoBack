const router = require('express').Router()
const Task = require('../../db.js');

router.route('/tasks').patch(async (req, res) => {
    try {
        const result = await Task.findOne({
            where:{
                uuid: req.body.id,
            }
        })
        result.done = req.body.done ?? result.done;
        result.name = req.body.name ?? result.name;
        await result.save();
        res.status(202).send(result);
    } catch(err) {
        res.status(401).send(err);
    }
})

module.exports = router;