const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/', (_, res) => {
    res.status(200).send('sem problemas aqui');
 });

router.get('/:livro', (req, res) => {
    let livro = caminhoDados+req.params.livro;
    fs.readFile(livro, 'latin1', (erro, conteudo) => {
        if (erro) {
            res.status(400).send(erro);
        } else {
            let palavras = conteudo.toUpperCase();
            let tamanho = [];
            var tabela = new Object();  
            palavras = palavras.replace(/[:»«_*?;!><.,]/g,' ');
            palavras = palavras.replace(/\n/g,' ');
            palavras = palavras.replace(/\r/g,' ');
            palavras = palavras.replace(/\t/g,' ');
            palavras = palavras.replace(/-{2}/g,' ');
            palavras = palavras.replace(/ /g,'#');
            palavras = palavras.split(/#+/);
            for (let i = 0; i <  palavras.length ; i++) {
                tamanho[i] = palavras[i].length;
            };
            tabela.palavra = palavras;
            tabela.N = tamanho;

            console.log(tamanho);

            res.status(200).send(tabela);
        }
    });
 });

 module.exports = router;