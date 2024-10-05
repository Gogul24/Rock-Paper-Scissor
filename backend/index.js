const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stone_paper_scissor',
    password: 'admin',
    port: 5432,
});


app.post('/save-results', async (req, res) => {
    const { player1, player2, score1, score2, winner } = req.body;

    try {
        const queryText = `
            INSERT INTO games (player1, player2, score1, score2, finalWinner)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [player1, player2, score1, score2, winner];

        await pool.query(queryText, values);
        res.json({ message: 'Game results saved successfully' });
    } catch (err) {
        console.error('Error saving game results:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});


app.get('/game-history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching game history:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
