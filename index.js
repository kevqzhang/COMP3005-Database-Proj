const express = require("express");
const app = express();

const session = require("express-session");

app.use(session({secret: "choco-chip"}));
app.use(function(req, res, next){
    console.log(req.session);
    next();
});

app.get("/", (req, res) => {
    res.render("index.pug");
});

app.set("View engine", "pug");
app.set("views", "pages"); 

app.listen(3000);
console.log("Listening at http://localhost:3000");