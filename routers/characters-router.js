const express = require("express");
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("We're still gud!");
});

router.get("/", loadCharacters, sendCharacters);

function loadCharacters(req, res, next) {
    db.all('SELECT * FROM characters', [], (err, rows) => {
        if(err) { throw err }
        console.log(rows);
        res.characters = rows;
        next();
    });
}

function sendCharacters(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("./view-characters/view-characters.pug", {characters: res.characters})},
        "application/json": () => {res.status(200).json(res.characters)}
    }); 
}

module.exports = router;