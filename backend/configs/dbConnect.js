const mongoose = require('mongoose');
const { CONNECTIONURL } = require('./envConfig');

const dbConnect = async () => {
    try {
        await mongoose.connect(CONNECTIONURL);
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

dbConnect();
module.exports = dbConnect;