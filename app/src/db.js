// We impor the needed extensions to connect to database
const { Pool } = require('pg'); // We use pg to bridge react and postgreSql
const { db } = require('./config');

// We save inside connection const all the data to stablish the connection with already security
const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    database: db.database,
    port: db.port
});

// We export our connection constant
module.exports = pool;