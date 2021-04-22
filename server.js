// DEPENDENCIES
// add required npm packages
const express = require("express");
const path = require("path");

// Create "express" server to connect browser , set PORT
const app = express();
const PORT = process.env.PORT || 3000;

// Let express connect URL and parse JSON data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Set Route let server respond and interact with users
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


//Set a listener to display port
app.listen(PORT, function() {
    console.log("Note-taker App is listening on PORT: " + PORT);
});