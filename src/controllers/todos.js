const todoService = require('../services/todos');

const TAG = "To-do controller: ";





exports.getAll = async (req, res) => {
    console.log(TAG, "getAll() from " + req.connection.remoteAddress)
    console.time('getAll()')
    // Precisa tratar algum input?      Não
        // Não precisa fazer nada

    
    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    try {
        // Chama o método do Service
        const serviceResponse = await todoService.getAll();

        // Retornar com sucesso
        res.status(200).send(serviceResponse);
        // response.message = 'Success';
        // response.data = serviceResponse.rows;
        //
        // res.status(200).send(JSON.stringify(response));
        console.timeEnd('getAll()')

    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('getAll()')
    }
};






exports.getTodo = async (req, res) => {
    console.log(TAG, "getTodo() from " + req.connection.remoteAddress)
    console.time('getTodo()')
    // Precisa tratar algum input?      Sim
    const id = req.params.id;
    
    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    // Verifica se foi informado um ID válido
    if (isNaN(id)) {
        console.log(TAG, "Parameter isNaN")
        response.error = 'Informe uma ID válida'
        res.status(400).send(JSON.stringify(response));
        console.timeEnd('getTodo()')
        //return;          // Exemplo de erro com 2 res.send();
    }

    try {
        // Chama o método do Service enviando input tratado
        const serviceResponse = await todoService.getTodo(id);

        // Retornar com sucesso
        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('getTodo()')
            
    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('getTodo()')
    }
}





exports.getTopTodos = async (req, res) => {
    console.log(TAG, "getTopTodos() from " + req.connection.remoteAddress)
    console.time('getTopTodos()')
    // Precisa tratar algum input?      Sim
    const count = req.params.count;
    
    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    // Verifica se foi informado um valor válido
    if (isNaN(count)) {
        console.log(TAG, "Parameter isNaN")
        response.error = 'Informe um valor válido'
        res.status(400).send(JSON.stringify(response));
        console.timeEnd('getTopTodos()')
        return;
    }

    try {
        // Chama o método do Service enviando input tratado
        const serviceResponse = await todoService.getTopTodos(count);

        // Retornar com sucesso
        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('getTopTodos()')
            
    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('getTopTodos()')
    }
}






exports.createTodo = async (req, res) => {
    console.log(TAG, "createTodo() from " + req.connection.remoteAddress)
    console.time('createTodo()')
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;
    
    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority)) {
        console.log(TAG, "Priority isNaN")
        response.error = 'Informe uma prioridade válida'
        res.status(400).send(JSON.stringify(response));
        console.timeEnd('createTodo()')
        return;
    }
    
    try {
        // Chama o método do Service
        const serviceResponse = await todoService.createTodo(newTodo);

        // Retornar com sucesso
        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('createTodo()')

    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('createTodo()')
    }
}



exports.updateTodo = async (req, res) => {
    console.log(TAG, "updateTodo() from " + req.connection.remoteAddress)
    console.time('updateTodo()')
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;
    
    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority) || isNaN(newTodo.id)) {
        console.log(TAG, "Priority/Id isNaN")
        response.error = 'Informe uma prioridade e/ou ID válida(s)'
        res.status(400).send(JSON.stringify(response));
        console.timeEnd('updateTodo()')
        return;
    }

    try {
        // Chama o método do Service
        const serviceResponse = await todoService.updateTodo(newTodo);

        // Retornar com sucesso
        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('updateTodo()')

    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('updateTodo()')
    }
}



exports.deleteTodo = async (req, res) => {
    console.log(TAG, "deleteTodo() from " + req.connection.remoteAddress)
    console.time('deleteTodo()')
    // Precisa tratar algum input?      Sim
    const todoId = req.params.id;
    const userId = req.params.userId;

    // Pradronizar a resposta
    const response = {
        message:'',
        data:null,
        error: null
    }

    // Verifica se foi informado um ID válido
    if (isNaN(todoId) || isNaN(userId)) {
        console.log(TAG, "An Id isNaN")
        response.error = 'Informe IDs válidos'
        res.status(400).send(JSON.stringify(response));
        console.timeEnd('deleteTodo()')
        return;
    }

    try {
        // Chama o método do Service enviando input tratado
        const serviceResponse = await todoService.deleteTodo(todoId, userId)
        // Retornar com sucesso
        if (serviceResponse == "No affected rows") {
            response.error = 'Nenhum valor alterado'
            res.status(400).send(JSON.stringify(response));
            console.timeEnd('deleteTodo()')
            return;
        }

        const data = {
            todo:serviceResponse.todosResponse.rows,
            user:serviceResponse.usersResponse.rows
        }

        response.message = 'Success';
        response.data = data;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('deleteTodo()')

    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('deleteTodo()')
    }
}




// SQL INJECTION
exports.injection = async (req, res) => {
    console.log(TAG, "injection() from " + req.connection.remoteAddress)
    console.time('injection()')
    
    const newTodo = req.body;
    
    const response = {
        message:'',
        data:null,
        error: null
    }

    if (isNaN(newTodo.priority) || isNaN(newTodo.id)) {
        console.log(TAG, "Priority/Id isNaN")
        response.error = 'Informe uma prioridade e/ou ID válida(s)'
        res.status(400).send(JSON.stringify(response))
        console.timeEnd('injection()')
        return;
    }

    try {
        const serviceResponse = await todoService.injection(newTodo);

        response.message = 'Success';
        response.data = serviceResponse.rows;

        res.status(200).send(JSON.stringify(response));
        console.timeEnd('injection()')

    } catch (error) {
        console.log(TAG, error)
        
        response.error = 'Erro interno do Servidor'
        res.status(500).send(JSON.stringify(response));
        console.timeEnd('injection()')
    }
}