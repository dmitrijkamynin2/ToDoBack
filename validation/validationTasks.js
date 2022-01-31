const express = require('express');
const { body, validationResult } = require('express-validator');
const routerValid = require('express').Router()
const Tasks = require('../model/Tasks.js')

routerValid.route('/tasks').post(
    body("name")
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
)

module.exports = routerValid;