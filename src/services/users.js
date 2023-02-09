const userRepository = require('../repository/user');

const TAG = "User Service: ";



exports.getAll = async () => {
    try {
        const resp = await userRepository.getAll();
        return resp;
                
    } catch (error) {
        console.log(TAG, error);
    }
};