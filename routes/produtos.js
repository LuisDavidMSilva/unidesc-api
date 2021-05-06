const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');

//Cadastrando produto
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
    Produto.findById('6092937f428a102d6e140dad');
    if (id === '6092937f428a102d6e140dad') {
        res.status(200).json(
            {
                message: 'produto encontrado',
                id: id,

            });
            console.log(Produto);
    }
    else {
        (err => {
            res.status(400).json({
                message: 'Produto não encontrado',
                error: err
            });
        })
    };
});


//Atualizando um produto pelo ID
router.put('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    const preco = req.body.preco;
    Produto.findByIdAndUpdate({ _id: '6092937f428a102d6e140dad', $set:{preco: 2456}, new: true })
    .exec()
        
        .then(result => {
            res.status(201).json(doc,
                {
                    message: 'produto atualizado'
                }
            )
        })
        .catch(err => {
                    (err => {
                        res.status(400).json({
                            message: 'Produto não encontrado',
                            error: err
                        })
                    });
                });

   }
)

//Deletando um produto pelo ID
router.delete('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    if (id === '6092937f428a102d6e140dad') {
        Produto.findOneAndDelete({ _id: '6092937f428a102d6e140dad' })
        res.status(201).json(
            {
                message: 'produto deletado'
            })
    }
    else {
        (err => {
            res.status(400).json({
                message: 'Produto não encontrado',
                error: err
            })
        });
    };
});

module.exports = router;