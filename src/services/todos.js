const todoRepository = require('../repository/todos');

const TAG = "To-do Service: ";



exports.getAll = async () => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada
        
    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
        // Precisa filtrar/organizar?           Não
        const resp = await todoRepository.getAll();

        // Precisa fazer algo internamente com esses dados?     Não
            //Não precisa fazer nada, só retornar a informação
        return resp;
        
    } catch (error) {
        console.log(TAG, error)
    }
};




exports.getTodo = async (_id) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim, está procurando um ID específico
    const resp = await todoRepository.getTodo(_id);

    // Precisa fazer algo internamente com esses dados?     Não
        //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};




exports.getTopTodos = async (_count) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim, está procurando um ID específico
    const resp = await todoRepository.getTopTodos(_count);

    // Precisa fazer algo internamente com esses dados?     Não
        //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};




exports.createTodo = async (_newTodo) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim
        // O Repository precisa receber os dados a serem inseridos como um array
    const values = [_newTodo.name, _newTodo.priority];

    const resp = await todoRepository.createTodo(values)
            // Precisa fazer algo internamente com esses dados?     Não
                //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};



exports.updateTodo = async (_newTodo) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim
        // O Repository precisa receber os dados a serem inseridos como um array
    const values = [_newTodo.id, _newTodo.name, _newTodo.priority];

    const resp = await todoRepository.updateTodo(values);
            // Precisa fazer algo internamente com esses dados?     Não
                //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};




exports.deleteTodo = async (_id, _userId) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim, está procurando um ID específico
    const resp = await todoRepository.deleteTodo(_id, _userId);
            // Precisa fazer algo internamente com esses dados?     Não
                //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};




// SQL INJECTION
exports.injection = async (_newTodo) => {
    try {
    const values = [_newTodo.id, _newTodo.name, _newTodo.priority];

    const resp = await todoRepository.injection(values);
        return resp;

    } catch (error) {
        console.log(TAG, error)
    }
};