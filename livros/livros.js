const express = require('express');
const router = express.Router();
const fs = require('fs');



router.get('/', (_, res) => {
    res.status(200).send('sem problemas aqui');
});

router.get('/:livro', (req, res) => {
    let livro = caminhoDados + req.params.livro;
    fs.readFile(livro, 'latin1', (erro, conteudo) => {
        if (erro) {
            res.status(400).send(erro);
        } else {
            res.status(200).send(conteudo);
        }
    });
});

module.exports = router;