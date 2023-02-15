// Import Libraries
const express = require('express');
const bodyParser = require('body-parser');

// Create the app
const app = express();
const PORT = 3001;

// Init Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Endpoints





// Listen to PORT for Http requests
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});