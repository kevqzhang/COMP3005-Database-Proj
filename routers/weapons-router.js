const express = require("express");
const res = require("express/lib/response");
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});

router.get("/", loadWeapons, sendWeapons);
router.get("/:id", loadWeapon, sendWeapon);

function loadWeapons(req, res, next) {
    let search;
    if (!req.query.search) search = "";
    else search = req.query.search;
    db.all('SELECT * FROM weapons WHERE weaponName LIKE ?', ["%" + search + "%"], (err, rows) => {
        if(err) { throw err }
        res.weapons = rows;
        let script = "SELECT * FROM characters WHERE cid in ( select cid from wields where weaponName like ?)"
        db.all(script, ["%" + search + "%"], (err, rows2) => {
            if(err) { throw err }
            res.characters = rows2;
            next();
        });
    });
}

function sendWeapons(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-weapons.pug", {weapons: res.weapons, characters: res.characters})},
        "application/json": () => {res.status(200).json(res.weapons)}
    }); 
}

function loadWeapon(req, res, next) {
    let id = req.params.id;
    db.get('SELECT * FROM weapons WHERE weaponName = ?', [id], (err, row) => {
        if(err) { throw err }
        res.weapon = row;
        next();
    });
}

function sendWeapon(req, res, next) {
    res.format({
        "text/html": () => {res.status(200).render("view-weapon.pug", {weapon: res.weapon})},
        "application/json": () => {res.status(200).json(res.weapon)}
    }); 
}


module.exports = router;