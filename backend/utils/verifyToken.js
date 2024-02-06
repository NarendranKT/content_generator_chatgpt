const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/envConfig');

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return err;
        }
        return decoded;
    })
}

module.exports = verifyToken;