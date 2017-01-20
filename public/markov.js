import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import {
    Form,
    FormGroup,
    FormControl,
    Col,
    ControlLabel,
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

export default class Markov extends React.Component {
    constructor(props) {
        super(props);

        this.words_num_default = 20;
        this.words_num_min = 2;
        this.words_num_max = 50;
        this.chars_max = 10000;

        this.initState();

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });

        this.keepState();
    }

    handleNumberChange(event) {
        var value = event.target.value

        if(value < this.words_num_min) value = this.words_num_min;
        if(value > this.words_num_max) value = this.words_num_max;

        this.setState({
            words_num: parseInt(value)
        });

        this.keepState();
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.charLimitExceeded()) {
            return;
        }

        axios({
            "method":       "post",
            "url":          "/markov",
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

                this.keepState();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        var gs_list = this.state.generated_sentences.map((sentence, ind) =>
            <ListGroupItem key={ind} style={{ fontSize: 18 }}>{sentence}</ListGroupItem>
        );


        var gs_list_title = undefined;
        if(gs_list.length > 0) {
            gs_list_title = <h4>Generated sentences</h4>
        }

        var chars_exceeded = "";

        if(this.charLimitExceeded()) {
            chars_exceeded = "Characters Limit Exceeded";
        }

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
                            Charecters Written
                        </Col>
                        <Col sm={2} componentClass={ControlLabel}>
                            {this.state.text.length} / {this.chars_max}
                        </Col>
                        <Col sm={8} componentClass={ControlLabel} style={{ color: "red" }}>
                            {chars_exceeded}
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Number of Generated Words
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
                {gs_list_title}
                <ListGroup>{gs_list}</ListGroup>
            </div>
        );
    }

    charLimitExceeded() {
        return this.state.text.length >= this.chars_max;
    }

    initState() {
        if("state" in localStorage) {
            this.state = JSON.parse(localStorage.getItem("state"));
        } else {
            this.state = {
                text: "",
                words_num: this.words_num_default,
                generated_sentences: []
            };
        }
    }

    keepState() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }
}

ReactDOM.render(<Markov />, document.getElementById("markov"));
