const express = require("express");
const res = require("express/lib/response");
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});

router.get("/", loadArmors, sendArmors);
router.get("/:id", loadArmor, sendArmor);

function loadArmors(req, res, next) {
    let search;
    if (!req.query.search) search = "";
    else search = req.query.search;
    db.all('SELECT * FROM armor WHERE armorName LIKE ?', ["%" + search + "%"], (err, rows) => {
        if(err) { throw err }
        res.armors = rows;
        db.all('SELECT * FROM characters WHERE wears LIKE ?', ["%" + search + "%"], (err, rows2) => {
            if(err) { throw err }
            res.characters = rows2;
            next();
        });
    });
}

function sendArmors(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-armors.pug", {armors: res.armors, characters: res.characters})},
        "application/json": () => {res.status(200).json(res.armors)}
    }); 
}

function loadArmor(req, res, next) {
    let id = req.params.id;
    db.get('SELECT * FROM armor WHERE armorName = ?', [id], (err, row) => {
        if(err) { throw err }
        res.armor = row;
        next();
    });
}

function sendArmor(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-armor.pug", {armor: res.armor})},
        "application/json": () => {res.status(200).json(res.armor)}
    }); 
}


module.exports = router;