const pool = require('./db-pool')

const TAG = "User Repository: ";



exports.getAll = async () => {
    // Realiza a requisição
    try {
        const query = await pool.query('SELECT * FROM users');
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')
        
    } catch (error) {
        console.log(TAG, error);
        throw error
    }
};