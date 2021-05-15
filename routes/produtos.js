const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');
const checkauth = require('../middleware/checkauth');


//Cadastrando produto
//Pode ser adicionado o parâmetro 'checkauth' para autenticar o usuário  para fazer alterações no banco
router.post('/', (req, res, next) => {

    const produto = new Produto(
        {
            _id: mongoose.Types.ObjectId(),
            nome: req.body.nome,
            preco: req.body.preco
        }
    );

    produto.save()
        .then(result => {
            res.status(201).json({
                message: 'POST Request para /produtos',
                produto: produto
            });
        })
        .catch(err => {
            res.status(500).json({
                erro: err
            });
        });
});

//Recuperando todos os produtos
router.get('/', (req, res, next) => {
    Produto.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

//Recuperando um único produto pelo ID
router.get('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    Produto.findById(id)   
    .exec()
        .then(doc => {
            res.status(200).json({
                message:'produto encontrado',
                produto: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});


//Atualizando um produto pelo ID
router.put('/:produtoId', (req, res, next) => {
     const id = req.params.produtoId;
     //Para atualizar outro produto deve ser alterado o valor parâmetro _id, o 2º parametro é o atributo a ser alterado e a atualização em si
    Produto.findByIdAndUpdate({_id: "609fde2afdc398811775f609"}, {preco:2499}, {new:true})
    .exec()
    .then(doc =>{
        res.status(201).json({
            message:'produto atualizado',
            produto: doc
        })

    })
    .catch(err =>{
        res.status(500).json({
            message:'produto não encontrado'
        });
    })
});

//Deletando um produto pelo ID
router.delete('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
        Produto.findOneAndDelete({_id: "609fde2afdc398811775f609"})
        .then(
        res.status(201).json(
            {
                message: 'produto deletado'
            })
        )
        .catch(err => {
            res.status(400).json({
                message: 'Produto não encontrado',
                error: err
            });
        })
});

module.exports = router;