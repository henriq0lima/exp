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

router.get('/:livro', (req, res) => {
  let livro = caminhoDados+req.params.livro;
    fs.readFile(livro, 'latin1', (erro, conteudo) => {
        if (erro) {
            res.status(400).send(erro);
          } else {
            let padrao = `INSERT INTO palavras(palavra, n_repeticoes) values('`;
            let queryString = ``;
            let palavras = conteudo.toUpperCase();
            palavras = palavras.replace(/[:»«_*?;!><.,]/g,' ');
            palavras = palavras.replace(/\n/g,' ');
            palavras = palavras.replace(/\r/g,' ');
            palavras = palavras.replace(/\t/g,' ');
            palavras = palavras.replace(/-{2}/g,' ');
            palavras = palavras.replace(/ /g,'#');
            palavras = palavras.split(/#+/);
            // for (let i = 0; i <  palavras.length ; i++) {
            //   queryString = padrao+palavras[i]+`','`+palavras[i].length+`')`;
            //   pool.query(queryString, (err,res) => {});
            // };
            console.log(queryString);
            // res.status(200).send(palavras);
            pool.connect()
            .then(() => pool.query("select * from palavras where n_repeticoes>18"))
            .then(results => res.status(200).send(results.rows[1]))
            
        }
    });
  
});

module.exports = router;