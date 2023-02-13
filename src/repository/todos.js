const pool = require('./db-pool')

const TAG = "To-do Repository: ";



exports.getAll = async () => {
    // Realiza a requisição
    try {
        const query = await pool.query('SELECT * FROM todos');
        if (query.rows[0])  return query.rows;      // É papel do repository retornar apenas os resultados da query
        throw new Error('No rows returned')                  // Envia um erro caso nenhuma linha seja retornada pelo postgres
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};



exports.getTodo = async (_id) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        const query = await (pool.query('SELECT * FROM todos WHERE id = $1', [_id]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};



exports.getTopTodos = async (_count) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        const query = await pool.query('SELECT * FROM todos ORDER BY priority DESC LIMIT $1', [_count]);
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
}



exports.createTodo = async (_name, _priority) => {
    // Realiza a requisição com filtragem/ordenação
        try {
            const query = await pool.query('INSERT INTO todos (name, priority) VALUES ($1,$2) RETURNING *', [_name, _priority]);
            return query.rows
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};



exports.updateTodo = async (_id, _name, _priority) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        const query = await pool.query('UPDATE todos SET name = $2, priority = $3 WHERE id = $1 RETURNING *', [_id, _name, _priority]);
        return query.rows
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
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
            todosResponse: query1.rows,
            usersResponse: query2.rows
        }

        // Verifica se as queries foram realizadas com sucesso
            // Se houver erro nestas queries, não haverá valores no array 'rows'
        if (query1.rows[0] && query2.rows[0]) {
            await pool.query('commit')  // Finaliza a transaction com sucesso
            return myResponse;
        }
        
        await pool.query('rollback');   // Cancela a transaction
        throw new Error("No affected rows");
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};





// SQL INJECTION
exports.injection = async (_id, _name, _priority) => {
    try {
        const query = await pool.query(`UPDATE todos SET priority = ` + _priority + `, name = ` + _name);   //Exemplo de SQL Injection
        return query.rows
        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};