/**
 * Initialize the user and database in the server
 */

if (!process.env.CI) {
    require('dotenv').config();
}

const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

const config = {
    user:       'postgres',
    password:   'password', // TODO: change this to your password to the server
    host:       'localhost',
    port:       5432,
    database:   'postgres'
};

const client = new Pool(config);

(async () => {
    try {
        const query = await fs.readFile(
            path.join(__dirname, 'sqls', 'init.sql'),
            { encoding: 'utf-8' }
        );
        await client.query(query);
        await client.end();
        console.log('Insert Done');
    } catch (err) {
        console.log(err);
        throw err;
    }
})();
