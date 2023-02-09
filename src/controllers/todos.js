const todoService = require('../services/todos');

const TAG = "To-do controller: ";





exports.getAll = async (req, res) => {
    console.log(TAG, "getAll() from " + req.connection.remoteAddress)
    // Precisa tratar algum input?      Não
        // Não precisa fazer nada

    try {
        // Chama o método do Service
        const resp = await todoService.getAll();

        // Retornar com sucesso
        res.status(200).send(resp);
        // res.status(200).send(JSON.stringify(resp.rows));

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
    }
};






exports.getTodo = async (req, res) => {
    console.log(TAG, "getTodo() from " + req.connection.remoteAddress)
    // Precisa tratar algum input?      Sim
    const id = req.params.id;

    // Verifica se foi informado um ID válido
    if (isNaN(id)) {
        console.log(TAG, "Parameter isNaN")
        res.status(400).send('Informe um ID válido');
        return;          // Exemplo de erro com 2 res.send();
    }

    try {
        // Chama o método do Service enviando input tratado
        const resp = await todoService.getTodo(id);

        // Retornar com sucesso
        res.status(200).send(JSON.stringify(resp.rows));
            
    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
    }
}






exports.createTodo = async (req, res) => {
    console.log(TAG, "createTodo() from " + req.connection.remoteAddress)
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority)) {
        console.log(TAG, "Priority isNaN")
        res.status(400).send('Informe uma prioridade válida')
        return;
    }
    
    try {
        // Chama o método do Service
        const resp = await todoService.createTodo(newTodo);

        // Retornar com sucesso
        res.status(201).send(JSON.stringify(resp.rows));

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
    }
}



exports.updateTodo = async (req, res) => {
    console.log(TAG, "updateTodo() from " + req.connection.remoteAddress)
    // Precisa tratar algum input?      Sim
    const newTodo = req.body;

    // Verifica se os dados são válidos
    if (isNaN(newTodo.priority) || isNaN(newTodo.id)) {
        console.log(TAG, "Priority/Id isNaN")
        res.status(400).send('Informe uma prioridade e/ou ID válida(s)')
        return;
    }
    
    try {
        // Chama o método do Service
        const resp = await todoService.updateTodo(newTodo);

        // Retornar com sucesso
        res.status(200).send(JSON.stringify(resp.rows));

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
    }
}



exports.deleteTodo = async (req, res) => {
    console.log(TAG, "deleteTodo() from " + req.connection.remoteAddress)
    // Precisa tratar algum input?      Sim
    const todoId = req.params.id;
    const userId = req.params.userId;

    // Verifica se foi informado um ID válido
    if (isNaN(todoId) || isNaN(userId)) {
        console.log(TAG, "An Id isNaN")
        res.status(400).send('Informe IDs válido')
        return;
    }

    try {
        // Chama o método do Service enviando input tratado
        const resp = await todoService.deleteTodo(todoId, userId)
        // Retornar com sucesso
        if (resp == "No affected rows") {
            res.status(400).send(JSON.stringify(resp));
            return;
        }

        const response = {
            todo:resp.todosResponse.rows,
            user:resp.usersResponse.rows
        }
        res.status(200).send(JSON.stringify(response));

    } catch (error) {
        console.log(TAG, error)
        res.status(500).send("Erro interno do Servidor!");
    }
}