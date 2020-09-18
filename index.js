const express = require('express');
const livrosRouter = require('./livros/livros.js');
const app = express();

const {Client} = require('pg')
const client = new Client({
  user: "postgres",
  password: "senhafraca",
  host: "localhost",
  port: 5432,
  database: "livros"
})

client.connect()
.then (() => console.log('conected succes'))
.then(() => client.query("select * from palavras"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally (() => client.end())


app.use('/livros',livrosRouter);
global.caminhoDados = 'dados/';

app.listen(3000, function() {
  console.log('A API está funcionando!');
});

