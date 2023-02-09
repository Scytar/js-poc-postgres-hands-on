const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importa o arquivo/módulo de rotas
const router = require('./src/router');

const PORT = process.env.SERVER_PORT;
const HOSTNAME = process.env.SERVER_HOSTNAME;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));

// Utiliza o 'router.js' como middleware
app.use(router);

// Ouve requisições na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOSTNAME}:${PORT}`)
})