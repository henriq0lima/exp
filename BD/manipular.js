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

router.get('/:n', (req, res) => {
    let n = req.params.n;
    console.log(n);
    stringQuery = `select * from palavras where n_repeticoes>`+n;
    pool.connect()
    .then(() => pool.query(stringQuery))
    .then(results => res.status(200).send(results.rows))
 
});

module.exports = router;