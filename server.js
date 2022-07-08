const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "Buat ini jadi rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.set("view engine", "ejs");

const router = require("./router");
app.use(router);

app.listen(PORT, () => {
  console.log(`runing on ${PORT}`);
});
