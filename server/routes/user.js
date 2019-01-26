const express = require('express');

const User = require('../models/user');

const app = express();

app.get('/user/:id', (req, res) => {
    res.status(200).json({
        id: req.params.id
    });
});

app.post('/user', (req, res) => {
    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

module.exports = app;