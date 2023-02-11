const pool = require('./db-pool')

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