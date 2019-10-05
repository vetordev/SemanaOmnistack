const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
    
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mkjzr.mongodb.net/semana09?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true    
});
//req.query => parâmetros na url
//req.params = acessar route params (edição e delete)
//req.body = acessar corpo da requisição (edição e criação)

//Fazer o express entender o formato json
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


//usa as rotas criadas no routes.js

server.listen(3333);
