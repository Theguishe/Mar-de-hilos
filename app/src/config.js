// We import the needed extensions for connect to the database
const {config} = require('dotenv'); // Dotenv help us to hide variable names for more security
config()

// We export an object called db, which saves all the needed data for connect to the database
module.exports = {
    db: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE
    }
}