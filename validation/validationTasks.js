const express = require('express');
const { body, validationResult } = require('express-validator');
const { checkTask } = require('../model/Tasks.js');
const routerValid = require('express').Router()
const Tasks = require('../model/Tasks.js')

routerValid.route('/tasks').post(
    body("name")
        .isLength({ min: 1 })
        .custom(value => {
            return Tasks.checkTask(value).then(task => {
              if (task) {
                return Promise.reject('this name tasks already in use');
              }
            });
        }),
    body("done")
        .isBoolean(),
    body("createdAt")
        .custom(value => {
            if (new Date(value) == 'Invalid Date') {
                return Promise.reject('Invalid Date');
            }
            return true
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
)

module.exports = routerValid;