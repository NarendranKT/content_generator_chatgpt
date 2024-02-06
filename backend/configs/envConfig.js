const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 8000,
    CONNECTIONURL: process.env.CONNECTIONURL || 'mongodb://127.0.0.1:27017/AiContentGenerator',
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY,
    OPENAI_API: process.env.OPENAI_API,
    GEMINI_API: process.env.GEMINI_API,
    STRIPE_KEY: process.env.STRIPE_KEY,
    
}