const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const TAG = "User Repository: ";



exports.getAll = async () => {
    // Realiza a requisição
    try {
        const query = await pool.query('SELECT * FROM users');
        return query
        
    } catch (error) {
        console.log(TAG, error);
    }
};