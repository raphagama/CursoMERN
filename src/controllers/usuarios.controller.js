const Usuario = require('../models/usuario.model');


module.exports = {
    async index(req, res) {
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req, res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {};
        let user = await Usuario.findOne({email_usuario});
        
        if(!user){
            data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario};
            
            user = await Usuario.create(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).json(user);
        }
    },
    async details(req, res) {
        const {_id} = req.query;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },

}