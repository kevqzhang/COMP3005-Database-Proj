const express = require("express");
const res = require("express/lib/response");
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});

router.get("/", loadCharacters, sendCharacters);
router.get("/:cid", loadCharacter, sendCharacter);

function loadCharacters(req, res, next) {
    let search;
    if (!req.query.search) search = "";
    else search = req.query.search;
    db.all('SELECT * FROM characters WHERE name LIKE ?', ["%" + search + "%"], (err, rows) => {
        if(err) { throw err }
        res.characters = rows;
        next();
    });
}

function sendCharacters(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-characters.pug", {characters: res.characters})},
        "application/json": () => {res.status(200).json(res.characters)}
    }); 
}

function loadCharacter(req, res, next) {
    let cid = req.params.cid;
    db.get('SELECT * FROM characters WHERE cid = ?', [cid], (err, row) => {
        if(err) { throw err }
        console.log(row);
        res.character = row;
        next()
    });
}

function sendCharacter(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-character.pug", {char: res.character})},
        "application/json": () => {res.status(200).json(res.character)}
    }); 
}

module.exports = router;