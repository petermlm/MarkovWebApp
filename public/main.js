import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import config from "./config";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            words_num: 20,
            generated_sentences: []
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleNumberChange(event) {
        this.setState({
            words_num: parseInt(event.target.value)
        });
    }

    handleSubmit(event) {
        axios({
            "method":       "post",
            "url":          config.url + "/markov",
            "Content-Type": "application/json",
            "data":         {
                text: this.state.text,
                words_num: this.state.words_num
            },
        })
            .then((res) => {
                var data = res.data;
                var gs = this.state.generated_sentences;

                gs = gs.splice(0, 5)
                var res_list = [data].concat(gs)

                this.setState({
                    generated_sentences: res_list
                });
            })
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    render() {
        var gs_list = this.state.generated_sentences.map((sentence, ind) =>
            <li key={ind}>{sentence}</li>
        );

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input
                    type="number"
                    min="2"
                    max="50"
                    value={this.state.words_num}
                    onChange={this.handleNumberChange}
                />
                <input type="submit" value="Generate" />
            </form>
            <div>
            </div>
                <ul>{gs_list}</ul>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("main"));
