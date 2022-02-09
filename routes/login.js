const loginRouter = require('express').Router()
const { body } = require('express-validator');
const checkError = require('../checkErrorValidation/checkError.js');
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

loginRouter.route('/').post(
    body('name').isLength({ min: 1, max: 20}).withMessage('login must be between 1 and 20 characters'),
    body('password').isLength({ min: 6, max: 10}).withMessage('password must be between 6 and 10 characters'),
    checkError,
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
            const token = jwt.sign({id: checkingUser.id}, 'chereshnia', {expiresIn: '1h'});
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