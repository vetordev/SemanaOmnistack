const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mkjzr.mongodb.net/semana09?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true    
 })

//req.query => parâmetros na url
//req.params = acessar route params (edição e delete)
//req.body = acessar corpo da requisição (edição e criação)

//Fazer o express entender o formato json
app.use(express.json());
app.use(routes);
//usa as rotas criadas no routes.js

app.listen(3333);
