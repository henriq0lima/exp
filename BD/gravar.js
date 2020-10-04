const { query } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "senhafraca",
  host: "localhost",
  port: 5432,
  database: "livros"
});

function padronizar(texto){
    texto = texto.replace(/[:»«_*?;!><.,]/g,' ');
    texto = texto.replace(/\n/g,' ');
    texto = texto.replace(/\r/g,' ');
    texto = texto.replace(/\t/g,' ');
    texto = texto.replace(/-{2}/g,' ');
    texto = texto.replace(/ /g,'#');
    texto = texto.split(/#+/);
    return(texto)
}

router.get('/:livro', (req, res) => {
  let livro = caminhoDados+req.params.livro;
    fs.readFile(livro, 'latin1', (erro, conteudo) => {
        if (erro) {
            res.status(400).send(erro);
          } else {
            let padrao = `INSERT INTO palavras(palavra, n_repeticoes) values('`;
            let queryString = ``;
            let palavras = conteudo.toUpperCase();
            palavras = padronizar(palavras);
            for (let i = 0; i <  palavras.length ; i++) {
              queryString = padrao+palavras[i]+`','`+palavras[i].length+`')`;
              pool.query(queryString, (err,res) => {});
              if(i == palavras.length-1){console.log(palavras.length);};
            };            
        }
    });
  
});

module.exports = router;