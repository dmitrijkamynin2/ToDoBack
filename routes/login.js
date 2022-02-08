const loginRouter = require('express').Router()
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

loginRouter.route('/').post(
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
            const token = jwt.sign({id: checkingUser.id}, 'chereshnia', {expiresIn: '20s'});
            checkingUser.token = token;
            checkingUser.save();
            console.log(token)
            res.status(200).send(token);
        } catch(err) {
            console.log(err);
            res.status(404).json(err.message);
        }
    }
)

module.exports = loginRouter;