const { SIGTERM } = require('constants');
const express = require('express');
const { Server } = require('http');
const livrosRouter = require('./livros/livros.js');
const gravarRouter = require('./BD/gravar.js');
const manipularRouter = require('./BD/manipular.js');
//const manipularRouter = require('./BD/ler.js');
/*
livros router index livros
BD/gravar router input arq.txt in BD
BD/manipular return data select BD
BD/ler print BD in page
*/
const app = express();

global.caminhoDados = 'dados/';
app.use('/livros', livrosRouter);
app.use('/gravar/BD', gravarRouter);
app.use('/manipular/BD', manipularRouter);

app.listen(3000, function () {
  console.log('A API está funcionando!');
});
