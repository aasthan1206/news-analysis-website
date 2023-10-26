// import pg from 'pg';
// const { Pool } = pg;

const Pool  = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "root",
//     host: "localhost",
//     post: 5432,
//     database: "newsplatform"
// })

// module.exports = pool;

let localPoolConfig = {
    user: "postgres",
    password: "root",
    host: "localhost",
    post: 5432,
    database: "newsplatform"
};

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
} : localPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool;