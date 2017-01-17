import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            generated_sentences: [
                "This is a test sentence",
                "This is test another sentence"
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleSubmit(event) {
        console.log("Submitted");
        console.log(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        // TODO
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
                    onChange={this.handleChange}
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
