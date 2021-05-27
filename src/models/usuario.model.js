const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({
    nome_usuario: String,
    email_usuario: String,
    tipo_usuario: {type: Number, default: 1},
    senha_usuario: String,
}, {
    timestamps: true
});

DataSchema.pre('save', function(next){
    if(!this.isModified("senha_usuario")){
        return next();
    }
    this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
    next();
})
// Descomentar trecho de código código caso seja necessário futuramente com problema de criptografia na atualização de senha
// Se descomentar mudar em usuários.controller método findByIdAndUpdate na linha 36 para findOneAndUpdate na função Update (declaração da variável user)


// DataSchema.pre('findOneAndUpdate', function(next){
//     let password = this.getUpdate().senha_usuario+'';
//     if(password.length<55){
//         this.getUpdate().senha_usuario = bcrypt.hashSync(password, 10);
//     }
//     next();
// })

const usuarios = mongoose.model('Usuarios', DataSchema);
module.exports = usuarios;