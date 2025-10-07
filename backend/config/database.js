
const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnection = () => {
    mongoose.connect(process.env.DATABASE_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("DataBase successfully connected"))
    .catch((error) => {
        console.log("database is not connect");
        console.error(error);
        process.exit(1);
    })
}