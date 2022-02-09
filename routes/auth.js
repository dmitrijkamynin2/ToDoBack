const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
        try {
            const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
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