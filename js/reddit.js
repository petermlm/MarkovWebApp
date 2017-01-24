var path = require("path");
var spawn = require("child_process").spawn;

var express = require("express");
var axios = require("axios");

var markov = require("./markov");

var router = express.Router();

var count = 25;
function URL(username, after, step) {
    var query_string = "";

    if(after != undefined) {
        query_string += `?count=${count * step}&after=${after}`;
    }

    return `https://www.reddit.com/user/${username}/comments/.json${query_string}`;
}

function getCommentsPageStep(username, after, res_comments, step, resolve, reject) {
    axios.get(URL(username, after))
        .then((res) => {
            var comments = res.data.data.children;
            var res_after = res.data.data.after;

            comments.forEach((ele) => {
                res_comments += ele.data.body;
            });

            if(step == 3) {
                resolve(res_comments);
            } else {
                getCommentsPageStep(username, res_after, res_comments, step+1, resolve, reject);
            }
        })
        .catch((error) => {
            reject(error);
        });
}

function getCommentsPage(username) {
    return new Promise(
        (resolve, reject) => {
            getCommentsPageStep(username, undefined, "", 0, resolve, reject);
        });
}

router.get("/", (req, res) => {
    // Get username
    if(!("username" in req.query) || req.query["username"] === undefined) {
        res.end("No username provided");
        return;
    }

    var username = req.query["username"];

    // Get number of words
    var words_num = 20;

    if("words_num" in req.query) {
        words_num = parseInt(req.query["words_num"]);
    }

    // Get comments
    getCommentsPage(username)
        .then((comments) => {
            markov(comments, words_num)
                .then((results) => {
                    res.end(results);
                })
                .catch((error) => {
                    res.end("Error");
                });
        })
        .catch((error) => {
            res.end("Error");
        });
});

module.exports = router;
