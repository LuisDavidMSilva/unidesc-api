const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const webtoken = require('jsonwebtoken');

router.post('/signin', (req, res, next) => {

    Usuario.find({ email: req.body.email })
        .exec()
        .then(usuario => {
            if (usuario.length >= 1) {
                return res.status(409).json({
                    message: 'usuário já existe'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        const usuario = new Usuario({

                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        usuario
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    message: 'usuaŕio criado'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        })
        .catch()
});

router.post('/login', (req, res, next) => {

    Usuario.find({ email: req.body.email })
        .exec()
        .then(usuario => {
            if (usuario.length < 1) {
                return res.status(401).json({
                    message: 'usuário não encontrado'
                })
            }
            bcrypt.compare(req.body.password, usuario[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'erro na autenticação'
                    })
                }
                if (result) {
                    const token = webtoken.sign({email: usuario[0].email,id: usuario[0]._id}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
                    return res.status(200).json({
                        message: 'autenticado com sucesso',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'erro na autenticação'
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;