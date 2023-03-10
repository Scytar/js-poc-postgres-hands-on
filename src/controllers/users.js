const { json } = require('express');
const userService = require('../services/users');

const TAG = "Users controller: ";





exports.getAll = async (req, res) => {
    console.log(TAG, "getAll() from " + req.connection.remoteAddress)
    console.time('getAll()')

    const response = {
        message:'',
        data:null,
        error: null
    }

    try {
        const serviceResponse = await userService.getAll();
        
        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).json(response);
        console.timeEnd('getAll()')
        
    } catch (error) {
        console.log(TAG, error)
        
        response.message = 'Erro interno do Servidor'
        response.data = null;
        response.error = 'Erro interno do Servidor'
        
        res.status(500).json(response);
        console.timeEnd('getAll()')
    }

};