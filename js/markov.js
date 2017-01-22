var path = require("path");
var spawn = require("child_process").spawn;

var express = require("express");

var router = express.Router();

router.post("/", (req, res) => {
    // Get arguments of call
    var js = req.body;

    if(!("text" in js)) {
        console.log("In here");
        res.end("Error");
        return;
    }

    var text = js["text"];

    var cmd_args = ["-"];
    if("words_num" in js) {
        cmd_args.push(js["words_num"])
    }

    // Spawn process and prepare events
    markov = spawn("./../Markov/markov.py", cmd_args);

    markov.stdout.on("data", (data) => {
        results = data.toString("utf8");
        res.end(results);
    });

    markov.stderr.on("data", (data) => {
        res.end("Error");
    });

    // Send input data
    markov.stdin.write(text);
    markov.stdin.end();
});

module.exports = router;
