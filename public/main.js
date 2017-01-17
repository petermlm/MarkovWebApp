import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            generated_sentences: []
        };
    }

    componentDidMount() {
        // TODO
    }

    render() {
        return (
            <div>
                Implement Me!
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("main"));
