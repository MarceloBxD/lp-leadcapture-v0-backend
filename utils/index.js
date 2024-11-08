import { pool } from '../lib/dbConnection.js';

export async function connectToDatabase() {
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client.query('SELECT NOW()', (err, result) => {
                release();
                if (err) {
                    return console.error('Error executing query', err.stack);
                }
                console.log(result.rows);
            });
        }
        );
    }