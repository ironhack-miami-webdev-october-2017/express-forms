const express = require("express");
const ejsLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");


const app = express();

// SETUP --------------------------------------
app.set("view engine", "ejs");
// app.set("views", "views");
// app.set("layout", "layout.ejs");

app.use(ejsLayout);
app.use(express.static("public"));

// the "body-parser" package creates "req.body" in our routes
app.use(bodyParser.urlencoded({ extended: true }));
// end SETUP ----------------------------------


// ROUTES -------------------------------------
// STEP #1: show the search form
app.get("/", (req, res, next) => {
    res.render("home-page.ejs");
});

// STEP #2: process the search form submission
// <form method="get" action="/process-search">
//                |                   |
//   --------------                   |
//   |           ----------------------
//   |           |
app.get("/process-search", (req, res, next) => {
    console.log("req.query (query string) ~~~~~~~~~~~~~~~~");
    console.log(req.query);
    // Express automatically processes the query string
    // and turns it into an object (req.query)

    // send the user's search term (req.query.myTerm) to the view
    res.locals.theSearchTerm = req.query.myTerm;

    // if users check the box show them "hot-dog-results.ejs"
    if (req.query.hotDogCheck === "on") {
        res.render("hot-dog-results.ejs");
    }
    // otherwise show them "search-results.ejs"
    else {
        res.render("search-results.ejs");
    }
}); // GET /process-search

app.get("/login", (req, res, next) => {
    res.render("login-form.ejs");
});

app.post("/process-login", (req, res, next) => {
    console.log("req.body (form body) ----------------");
    console.log(req.body);
    // the "body-parser" package processes the form body string
    // and turns it into an object (req.query)
});
// end ROUTES ---------------------------------


app.listen(3000);
