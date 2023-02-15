// Init db
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('videogames.db', (err) => {
    // if there is an error connecting to db
    if(err) {
        console.error(err.message);
        throw err;
    }
    // else connect and maintain db
    else {
        console.log('CONNECTED TO DATABASE ...');
        db.run(`CREATE TABLE video_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            developer TEXT,
            publisher TEXT,
            genre TEXT,
            platform TEXT,
            release_date TEXT)`, (err) => {
                if(err) {
                    console.log("TABLE ALREADY CREATED");
                }
            });
    }
});

module.exports = db;