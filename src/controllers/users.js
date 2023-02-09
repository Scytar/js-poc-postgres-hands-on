const { json } = require('express');
const userService = require('../services/users');

const TAG = "Users controller: ";





exports.getAll = async (req, res) => {
    console.log(TAG, "getAll() from " + req.connection.remoteAddress)

    try {
        const resp = await userService.getAll();
        res.status(200).send(JSON.stringify(resp.rows));
        
    } catch (error) {
        console.log(TAG, error);
        res.status(500).send("Erro interno do Servidor!");
        return;
    }

};