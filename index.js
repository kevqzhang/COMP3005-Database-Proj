const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./dnd.db", (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("We're still gud!");
});

app.use(express.static(__dirname + "/public"));
app.set("View engine", "pug");
app.set("views", "pages");

app.get("/", (req, res) => {
    res.render("index.pug");
}); 

//characters
let charactersRouter = require("./routers/characters-router");
app.use("/characters", charactersRouter);

//weapons
let weaponsRouter = require("./routers/weapons-router");
app.use("/weapons", weaponsRouter);

//armors
let armorRouter = require("./routers/armor-router");
app.use("/armor", armorRouter);

//spells
let spellsRouter = require("./routers/spells-router");
app.use("/spells", spellsRouter);

app.listen(3000);
console.log("Listening at http://localhost:3000");