const pool = require('./db-pool')

const TAG = "To-do Repository: ";



exports.getAll = async () => {
    // Realiza a requisição
    try {
        const query = await pool.query('SELECT * FROM todos');
        return query;
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.getTodo = async (_id) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        return await pool.query('SELECT * FROM todos WHERE id = $1', [_id]);

    } catch (error) {
        console.log(TAG, error);
    }
};



exports.getTopTodos = async (_count) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        return await pool.query('SELECT * FROM todos ORDER BY priority DESC LIMIT $1', [_count])
        
    } catch (error) {
        console.log(TAG, error);
    }
}



exports.createTodo = async (_values) => {
    // Realiza a requisição com filtragem/ordenação
        try {
        return await pool.query('INSERT INTO todos (name, priority) VALUES ($1,$2) RETURNING *', _values);
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.updateTodo = async (_values) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        return await pool.query('UPDATE todos SET name = $2, priority = $3 WHERE id = $1 RETURNING *', _values);
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.deleteTodo = async (_id, _userId) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        // Inicia transaction
        await pool.query('begin;');
        
        // Realiza operação na primeira tabela
        const query1 = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [_id]);

        // Realiza operação na segunda tabela
        const query2 = await pool.query('UPDATE users SET completed = completed + 1 WHERE id = $1 RETURNING *', [_userId]);
        
        // Cria um objecto para retornar ao Service
        const myResponse = {
            todosResponse: query1,
            usersResponse: query2
        }

        // Verifica se as queries foram realizadas com sucesso
            // Se houver erro nestas queries, não haverá valores no array 'rows'
        if (query1.rows[0] && query2.rows[0]) {
            await pool.query('commit')  // Finaliza a transaction com sucesso
            return myResponse;
        }
        
        await pool.query('rollback');   // Cancela a transaction
        return "No affected rows";
        
    } catch (error) {
        console.log(TAG, error);
    }
};





// SQL INJECTION
exports.injection = async (_values) => {
    try {
        return await pool.query(`UPDATE todos SET priority = `+_values[2]+`, name = `+_values[1]); //Exemplo de SQL Injection
        
    } catch (error) {
        console.log(TAG, error);
    }
};