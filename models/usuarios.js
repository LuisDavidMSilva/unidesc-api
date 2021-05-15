const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const usuarioSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        email:{
            type: String,
            require:true,
            unique:true,
            match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        password:{
            type:String,
            require:true,
        }
});

module.exports = mongoose.model('Usuario',usuarioSchema);