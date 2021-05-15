const express = require('express');
const app = express();
const morgan = require('morgan');
const produtoRoutes = require('./routes/produtos');
const usuarioRoutes = require('./routes/usuarios');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://Luis:ehU0ih0yXj90Tsnn@unidesc.r15es.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan('dev'));

//Tratando o CORS
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

app.use((req, res, next) =>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;