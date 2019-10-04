const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mkjzr.mongodb.net/semana09?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true    
})

mongoose.connection.on('conectado', () => {
    console.log('Conectado');
})

//req.query => parâmetros na url
//req.params = acessar route params (edição e delete)
//req.body = acessar corpo da requisição (edição e criação)

//Fazer o express entender o formato json
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
//usa as rotas criadas no routes.js

app.listen(3333);
