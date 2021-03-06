import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import GSList from "./gs_list";

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

export default class Text extends React.Component {
    constructor(props) {
        super(props);

        this.words_num_default = 20;
        this.words_num_min = 2;
        this.words_num_max = 50;
        this.gs_list_length = 5;
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
            "url":          "/text",
            "Content-Type": "application/json",
            "data":         {
                text: this.state.text,
                words_num: this.state.words_num
            },
        })
            .then((res) => {
                var data = res.data;
                var gs = this.state.generated_sentences;

                gs = gs.splice(0, this.gs_list_length-1)
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
        var chars_exceeded = "";

        if(this.charLimitExceeded()) {
            chars_exceeded = "Characters Limit Exceeded";
        }

        return (
            <div>
                <h1 className="page_title">Markov Chain Text Generator</h1>
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
                        <Col className="charLimitFeedback" sm={8} componentClass={ControlLabel}>
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
                <GSList generated_sentences={this.state.generated_sentences} />
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
