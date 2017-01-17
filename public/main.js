import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

import config from "./config";

export default class Markov extends React.Component {
    constructor(props) {
        super(props);

        this.words_num_default = 20;
        this.words_num_min = 2;
        this.words_num_max = 50;

        this.state = {
            text: "",
            words_num: this.words_num_default,
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
        var value = event.target.value

        if(value < this.words_num_min) value = this.words_num_min;
        if(value > this.words_num_max) value = this.words_num_max;

        this.setState({
            words_num: parseInt(value)
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
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col sm={12} componentClass={ControlLabel}>
                            Input Text
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Insert text here"
                                value={this.state.text}
                                onChange={this.handleTextChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Number of Words
                        </Col>
                        <Col sm={2}>
                            <FormControl
                                componentClass="input"
                                type="number"
                                min={this.words_num_min}
                                max={this.words_num_max}
                                placeholder={this.words_num_default}
                                value={this.state.words_num}
                                onChange={this.handleNumberChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <Button type="submit">Generate</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div>
                    <ul>{gs_list}</ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Markov />, document.getElementById("markov"));
