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

// GET ENDPOINT
app.get('/videogames', (req, res) => {
    const sql = `SELECT * FROM video_games;`;
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

// GET BY ID ENDPOINT
app.get('/videogames/:id', (req, res) => {
    const sql = `SELECT * FROM video_games WHERE id = ?;`;
    const { id } = req.params;

    // if there exists no video_game with that id
    db.all(sql, id, (err, rows) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        else if(!rows.length) {
            res.status(400).send({message: 'ID does not exist'});
            return;
        }
        console.log("QUERY SUCCESSFUL");
        res.status(200).json(rows);
    });
});

app.post('/videogames', (req, res) => {
    // if the body doesn't have sufficient data it cannot be pushed
    if(!req.body.title || !req.body.developer || !req.body.publisher || !req.body.genre || !req.body.platform || !req.body.release_date) {
        res.status(400).send({
            message: 'Data missing, needs title, developer, publisher, genre, platform, and release_date'
        });
        return;
    }
    game = {
        title: req.body.title,
        developer: req.body.developer,
        publisher: req.body.publisher,
        genre: req.body.genre,
        platform: req.body.platform,
        release_date: req.body.release_date
    }
    const sql = `INSERT INTO video_games(title, developer, publisher, genre, platform, release_date) VALUES(?, ?, ?, ?, ?, ?);`;
    const params = [game.title, game.developer, game.publisher, game.genre, game.platform, game.release_date];
    
    // Make query
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        // TODO: Handle duplicates? make a query to see to db to see if there exists same game with the same title
        
        res.status(201).json({
            id: this.lastID,
            title: game.title,
            developer: game.developer,
            publisher: game.publisher,
            genre: game.genre,
            platform: game.platform,
            release_date: game.release_date
        });
    });
});

// PATCH ENDPOINT
app.patch('/videogames/:id', (req, res) => {
    // CATCH JSON request body
    const { platform, release_date } = req.body;
    const { id } = req.params;
    const update = `UPDATE video_games SET
        platform = COALESCE(?, platform),
        release_date = COALESCE(?, release_date)
        WHERE id = ?;`;
    // COALESCE means if not null then update query else keep data

    db.run(update, [platform, release_date, id], function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json({
            message: "SUCCESS",
            changes: this.changes
        });
    });
})
// DELETE ENDPOINT

app.delete('/videogames/:id', (req, res) => {
    // Query the deletion of ID
    const sql = `DELETE FROM video_games WHERE id = ?;`;
    const { id } = req.params;
    db.run(sql, [id], function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json({
            message: "SUCCESS",
            changes: this.changes
        });
    });
});




// Listen to PORT for Http requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});