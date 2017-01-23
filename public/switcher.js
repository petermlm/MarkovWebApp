import React from "react";
import { Button } from 'react-bootstrap';

export default class Switcher extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onSwitch();
    }

    render() {
        return (
            <Button onClick={this.handleClick}>{this.props.label}</Button>
        );
    }
}
