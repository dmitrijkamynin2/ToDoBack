const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
        try {
            console.log(req.headers.authorization);
            const decoded = jwt.verify(req.headers.authorization, 'chereshnia');
            console.log(decoded);
            // const { name, password } = req.body;
            // const thisUser = await db.User.findOne({
            //     where: {
            //         name: name,
            //     }
            // });
            // if (!checkingUser) {
            //     throw new Error('not such user');
            // }
            // const checkingPassword = (password === checkingUser.password);
            // if (!checkingPassword) {
            //     throw new Error('invalid password');
            // }
            // const token = jwt.sign(checkingUser.id, 'chereshnia');
            // res.status(200).json(token);
            next();
        } catch(err) {
            res.status(404).json(err.message);
        }
    }