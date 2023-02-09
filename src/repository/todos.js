const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const TAG = "To-do Repository: ";



exports.getAll = async () => {
    // Realiza a requisição
    try {
        const query = await pool.query('SELECT * FROM todos');
        return query
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.getTodo = async(_id) => {
    // Realiza a requisição com filtragem/ordenação
    
};



exports.createTodo = async (_values) => {
    // Realiza a requisição com filtragem/ordenação
        try {
        const query = await pool.query('INSERT INTO todos (name, priority) VALUES ($1,$2) RETURNING *', _values);
        return query
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.updateTodo = async (_values) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        // pool.query(`UPDATE todos SET priority = `+_values[2]+`, name = `+_values[1]); //Exemplo de SQL Injection
        const query = await pool.query('UPDATE todos SET name = $2, priority = $3 WHERE id = $1 RETURNING *', _values);
        return query
        
    } catch (error) {
        console.log(TAG, error);
    }
};



exports.deleteTodo = async (_id, _userId) => {
    // Realiza a requisição com filtragem/ordenação
    try {
        await pool.query('begin;');
        
        const query1 = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [_id]);

        const query2 = await pool.query('UPDATE users SET completed = completed + 1 WHERE id = $1 RETURNING *', [_userId]);
        
        const myResponse = {
            todosResponse: query1,
            usersResponse: query2
        }

        if (query1.rows[0] && query2.rows[0]) {
            await pool.query('commit')
            return myResponse;
        }
        
        await pool.query('rollback');
        return "No affected rows";
        
    } catch (error) {
        console.log(TAG, error);
    }
};