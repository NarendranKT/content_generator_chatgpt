const { NODE_ENV } = require("../configs/envConfig");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : {},
    })
}

module.exports = {errorHandler};