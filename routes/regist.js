const registRouter = require('express').Router()
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

registRouter.route('/').post(
    async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const checkingUser = await db.User.findOne({
                where: {
                    name: name,
                }
            });
            if (checkingUser) {
                throw new Error('there is already such a user');
            };
            const newUser = await db.User.create({name, password});
            res.status(200).send(newUser);
        } catch(err) {
            res.status(404).json(err.message);
        }
    }
)

module.exports = registRouter;