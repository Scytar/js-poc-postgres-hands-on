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
        console.log(TAG, 'error caught');
        throw error;
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
        console.log(TAG, 'error caught');
        throw error;
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
        console.log(TAG, 'error caught');
        throw error;
    }
};




exports.createTodo = async (_name, _priority) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim
    const resp = await todoRepository.createTodo(_name, _priority)
            // Precisa fazer algo internamente com esses dados?     Não
                //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};



exports.updateTodo = async (_id, _name, _priority) => {
    // Precisa calcular algo com os inputs?     Não
        // Não precisa fazer nada

    // Precisa pedir algo ao Bando de Dados?    Sim
    try {
    // Precisa filtrar/organizar?               Sim
    const resp = await todoRepository.updateTodo(_id, _name, _priority);
            // Precisa fazer algo internamente com esses dados?     Não
                //Não precisa fazer nada, só retornar a informação
        return resp;

    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
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
        console.log(TAG, 'error caught');
        throw error;
    }
};




// SQL INJECTION
exports.injection = async (_id, _name, _priority) => {
    try {
    const resp = await todoRepository.injection(_id, _name, _priority);
        return resp;

    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};