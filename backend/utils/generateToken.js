const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configs/envConfig");


const generateToken = (id) => {
    return jwt.sign({id}, SECRET_KEY, {expiresIn: "3d"})
}

module.exports = generateToken;
