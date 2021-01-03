const { Pool } = require('pg');

const pool = new Pool({
    user:       process.env.POSTGRES_USER,
    password:   process.env.POSTGRES_PASSWORD,
    host:       process.env.POSTGRES_HOST,
    port:       process.env.POSTGRES_PORT,
    database:   process.env.POSTGRES_DB
});

module.exports = {
    query: (text, values) => {
        const start = new Date();
        const res = pool.query(text, values);
        const diff = new Date(new Date() - start).getTime();
        console.log(`Query took ${diff}ms`);
        return res;
    },
    connect: () => pool.connect(),
    end: () => pool.end()
};