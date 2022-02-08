const loginRouter = require('express').Router()
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

loginRouter.route('/').patch(
    async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const checkingUser = await db.User.findOne({
                where: {
                    name: name,
                }
            });
            if (!checkingUser) {
                throw new Error('not such user');
            }
            const checkingPassword = (password === checkingUser.password);
            if (!checkingPassword) {
                throw new Error('invalid password');
            }
            const token = jwt.sign(checkingUser.id, 'chereshnia');
            res.status(200).json(token);
        } catch(err) {
            res.status(404).json(err.message);
        }
    }

        // console.log(token);
        // await db.User.create({name, password, token});
)

module.exports = loginRouter;