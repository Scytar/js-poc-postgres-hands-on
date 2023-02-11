const todoService = require('../services/todos');

const TAG = "To-do controller: ";





exports.getAll = async (req, res) => {
    console.log(TAG, "getAll() from " + req.connection.remoteAddress)
    console.time('getAll()')
    // Precisa tratar algum input?      Não
        // Não precisa fazer nada

    try {
        // Chama o método do Service
        const resp = await todoService.getAll();

        // Retornar com sucesso
        res.status(200).send(resp);
        // res.status(200).send(JSON.stringify(resp.rows));
        console.timeEnd('getAll()')

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('getAll()')
    }
};






exports.getTodo = async (req, res) => {
    console.log(TAG, "getTodo() from " + req.connection.remoteAddress)
    console.time('getTodo()')
    // Precisa tratar algum input?      Sim
    const id = req.params.id;

    // Verifica se foi informado um ID válido
    if (isNaN(id)) {
        console.log(TAG, "Parameter isNaN")
        res.status(400).send('Informe um ID válido');
        console.timeEnd('getTodo()')
        //return;          // Exemplo de erro com 2 res.send();
    }

    try {
        // Chama o método do Service enviando input tratado
        const resp = await todoService.getTodo(id);

        // Retornar com sucesso
        res.status(200).send(JSON.stringify(resp.rows));
        console.timeEnd('getTodo()')
            
    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('getTodo()')
    }
}





exports.getTopTodos = async (req, res) => {
    console.log(TAG, "getTopTodos() from " + req.connection.remoteAddress)
    console.time('getTopTodos()')
    // Precisa tratar algum input?      Sim
    const count = req.params.count;

    // Verifica se foi informado um valor válido
    if (isNaN(count)) {
        console.log(TAG, "Parameter isNaN")
        res.status(400).send('Informe um valor válido');
        console.timeEnd('getTopTodos()')
        return;
    }

    try {
        // Chama o método do Service enviando input tratado
        const resp = await todoService.getTopTodos(count);

        // Retornar com sucesso
        res.status(200).send(JSON.stringify(resp.rows));
        console.timeEnd('getTopTodos()')
            
    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('getTopTodos()')
    }
}






exports.createTodo = async (req, res) => {
    console.log(TAG, "createTodo() from " + req.connection.remoteAddress)
    console.time('createTodo()')
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority)) {
        console.log(TAG, "Priority isNaN")
        res.status(400).send('Informe uma prioridade válida')
        console.timeEnd('createTodo()')
        return;
    }
    
    try {
        // Chama o método do Service
        const resp = await todoService.createTodo(newTodo);

        // Retornar com sucesso
        res.status(201).send(JSON.stringify(resp.rows));
        console.timeEnd('createTodo()')

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('createTodo()')
    }
}



exports.updateTodo = async (req, res) => {
    console.log(TAG, "updateTodo() from " + req.connection.remoteAddress)
    console.time('updateTodo()')
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority) || isNaN(newTodo.id)) {
        console.log(TAG, "Priority/Id isNaN")
        res.status(400).send('Informe uma prioridade e/ou ID válida(s)')
        console.timeEnd('updateTodo()')
        return;
    }
    
    try {
        // Chama o método do Service
        const resp = await todoService.updateTodo(newTodo);

        // Retornar com sucesso
        res.status(200).send(JSON.stringify(resp.rows));
        console.timeEnd('updateTodo()')

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('updateTodo()')
    }
}



exports.deleteTodo = async (req, res) => {
    console.log(TAG, "deleteTodo() from " + req.connection.remoteAddress)
    console.time('deleteTodo()')
    // Precisa tratar algum input?      Sim
    const todoId = req.params.id;
    const userId = req.params.userId;

    // Verifica se foi informado um ID válido
    if (isNaN(todoId) || isNaN(userId)) {
        console.log(TAG, "An Id isNaN")
        res.status(400).send('Informe IDs válido')
        console.timeEnd('deleteTodo()')
        return;
    }

    try {
        // Chama o método do Service enviando input tratado
        const resp = await todoService.deleteTodo(todoId, userId)
        // Retornar com sucesso
        if (resp == "No affected rows") {
            res.status(400).send(JSON.stringify(resp));
            console.timeEnd('deleteTodo()')
            return;
        }

        const response = {
            todo:resp.todosResponse.rows,
            user:resp.usersResponse.rows
        }
        res.status(200).send(JSON.stringify(response));
        console.timeEnd('deleteTodo()')

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('deleteTodo()')
    }
}




// SQL INJECTION
exports.injection = async (req, res) => {
    console.log(TAG, "injection() from " + req.connection.remoteAddress)
    console.time('injection()')
    
    const newTodo = req.body;

    if (isNaN(newTodo.priority) || isNaN(newTodo.id)) {
        console.log(TAG, "Priority/Id isNaN")
        res.status(400).send('Informe uma prioridade e/ou ID válida(s)')
        console.timeEnd('injection()')
        return;
    }
    
    try {
        const resp = await todoService.injection(newTodo);

        res.status(200).send(JSON.stringify(resp.rows));
        console.timeEnd('injection()')

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
        console.timeEnd('injection()')
    }
}