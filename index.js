// Import Libraries
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

// Create the app
const app = express();
const PORT = 3001;

// Init Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Endpoints

// List all video_games in db
app.get('/videogames', (req, res) => {
    const sql = "SELECT * FROM video_games;";
    let params = [];

    db.all(sql, params, (err, rows) => {
        if(err) {
            res.send(400).json({"error": err.message});
            return;
        }
        console.log("QUERY SUCCESSFUL");
        res.status(200).json(rows);

    });
});




// Listen to PORT for Http requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});