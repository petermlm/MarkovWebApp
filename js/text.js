var path = require("path");
var spawn = require("child_process").spawn;

var express = require("express");

var markov = require("./markov");

var router = express.Router();

router.post("/", (req, res) => {
    // Get arguments of call
    var js = req.body;

    if(!("text" in js)) {
        res.end("Error");
        return;
    }

    var text = js["text"];
    var words_num = undefined;

    if("words_num" in js) {
        words_num = js["words_num"];
    }

    markov(text, words_num)
        .then((results) => {
            res.end(results);
        })
        .catch((error) => {
            res.end("Error");
        });
});

module.exports = router;
