const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
        //todo
        try {
            // console.log(req.headers.authorization);
            const decoded = jwt.verify(req.headers.authorization, 'chereshnia');
            // console.log(decoded);
            next();
        } catch(err) {
            console.log(err.message);
            if (err.message === 'jwt expired') {
                res.sendStatus(401);
            } else {
                res.status(404).json(err.message);
            }
        }
    }