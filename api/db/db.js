const {Pool} = require("pg");


/* const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {rejectUnauthorized: false}
}; */

// const pool = new Pool(dbConfig);

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: !!process.env.DATABASE_URL
})

module.exports = {
    query: (text, params) =>  pool.query(text, params)
}