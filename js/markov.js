var spawn = require("child_process").spawn;

module.exports = (text, words_num) => {
    return new Promise(
        (resolve, reject) => {
            markov = spawn("./../Markov/markov.py", ["-", words_num]);

            markov.stdout.on("data", (data) => {
                results = data.toString("utf8");
                resolve(results);
            });

            markov.stderr.on("data", (data) => {
                reject(data);
            });

            // Send input data
            markov.stdin.write(text);
            markov.stdin.end();
        });
};
