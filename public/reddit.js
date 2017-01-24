import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import {
    Form,
    FormGroup,
    FormControl,
    Col,
    ControlLabel,
    Button
} from 'react-bootstrap';

import GSList from "./gs_list";

export default class Reddit extends React.Component {
    constructor(props) {
        super(props);

        this.gs_list_length = 5;

        this.state = { username: "" };

        this.initState();

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.setState({ username: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        var username = this.state.username;

        axios.get(`/reddit?username=${username}&words_num=20`)
            .then((res) => {
                var data = res.data;
                var gs = this.state.generated_sentences;

                gs = gs.splice(0, this.gs_list_length-1)
                var res_list = [data].concat(gs)

                this.setState({
                    generated_sentences: res_list
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1 className="page_title">Reddit Comments Text Generator</h1>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                onChange={this.handleTextChange}
                                placeholder="username"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Generate</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <GSList generated_sentences={this.state.generated_sentences} />
            </div>
        );
    }

    initState() {
        this.state = {
            generated_sentences: []
        };
    }
}
