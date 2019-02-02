const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

const app = express();

app.get('/users', (req, res) => {
    let from = req.query.desde || 0;
    let limit = req.query.limite || 5;

    from = Number(from);
    limit = Number(limit);

    User.find({ state: true }, 'name email state role google img')
        .skip(from)
        .limit(limit)
        .exec((err, usersDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, counting) => {
                return res.json({
                    ok: true,
                    quantity: counting,
                    users: usersDB
                });
            });
        });
});

app.post('/user', (req, res) => {
    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario ya no existe'
                }
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

module.exports = app;