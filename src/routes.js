const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')

routes.get('/',Usuario.index);


//Rotas de Usuários
routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details',Usuario.details);
routes.post('/api/usuarios',Usuario.create);


module.exports =routes;