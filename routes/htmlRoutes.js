const path = require("path");

module.exports = function(app){
    
    // Route to the notes page
    app.get("/notes", function(request, response){
        response.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Route to the landing page
    app.get("/", function(request, response){
        response.sendFile(path.join(__dirname, "../public/index.html"));
    });
}