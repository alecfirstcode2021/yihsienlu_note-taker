// Required Packages
const fs = require("fs");
const dbnotesData = require("../db/db.json");

module.exports = function(app){

    function writeNoteToDB(notes){
        
        notes = JSON.stringify(notes);
        console.log (notes);
        // Writes file to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

//    API Route Setting

    // GET Method to console.log(dbnotesData);
    app.get("/api/notes", function(request, response){
        response.json(dbnotesData);
    });

    // POST Method save the note by pushing it on notes
    app.post("/api/notes", function(request, response){

        // Set id to entry
        if (dbnotesData.length == 0){
            request.body.id = "0";
        } else{
            request.body.id = JSON.stringify(JSON.parse(dbnotesData[dbnotesData.length - 1].id) + 1);
        }
        
        console.log("request.body.id: " + request.body.id);

        // Pushes pushing it on notes by using JSON
        dbnotesData.push(request.body);

        // Write notes data to database
        writeNoteToDB(dbnotesData);
        console.log(dbnotesData);

        // response new note
        response.json(request.body);
    });

    // DELETE Method to delete deletes the note by the id  and writes
    app.delete("/api/notes/:id", function(request, response){
        
        // display id and set to a string
        let id = request.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i=0; i < dbnotesData.length; i++){
           
            if (dbnotesData[i].id == id){
                console.log("id matching!");
                // responds with deleted note
                response.send(dbnotesData[i]);

                // Removes note
                dbnotesData.splice(i,1);
                break;
            }
        }

        writeNoteToDB(dbnotesData);

    });
};