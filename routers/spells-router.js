const express = require("express");
const res = require("express/lib/response");
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});

router.get("/", loadSpells, sendSpells);
router.get("/:id", loadSpell, sendSpell);

function loadSpells(req, res, next) {
    let search;
    if (!req.query.search) search = "";
    else search = req.query.search;
    db.all('SELECT * FROM spells WHERE spellName LIKE ?', ["%" + search + "%"], (err, rows) => {
        if(err) { throw err }
        res.spells = rows;
        let script = "SELECT * FROM characters WHERE cid in ( select cid from casts where spellName like ?)"
        db.all(script, ["%" + search + "%"], (err, rows2) => {
            if(err) { throw err }
            res.characters = rows2;
            next();
        });
    });
}

function loadSpell(req, res, next) {
    let id = req.params.id;
    db.get('SELECT * FROM spells WHERE spellName = ?', [id], (err, row) => {
        if(err) { throw err }
        res.spell = row;
        next();
    });
}

function sendSpell(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-spell.pug", {spell: res.spell})},
        "application/json": () => {res.status(200).json(res.spell)}
    }); 
}

function sendSpells(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-spells.pug", {spells: res.spells, characters: res.characters})},
        "application/json": () => {res.status(200).json(res.spells)}
    }); 
}

module.exports = router;