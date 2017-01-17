var express    = require("express");
var bodyParser = require("body-parser");

var markov = require("./js/markov");
var config = require("./js/config");

// Setup express application
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Serve page
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname });
});

// Take random sentence
app.use("/markov", markov);

// Start server
app.listen(config.port, function(){
    console.log("Live at Port: ", config.port);
});
