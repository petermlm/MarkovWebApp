import React from "react";

import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

export default class GSList extends React.Component {
    render() {
        var gs_list = this.props.generated_sentences.map((sentence, ind) =>
            <ListGroupItem className="genSentencesList" key={ind}>{sentence}</ListGroupItem>
        );

        var gs_list_title = undefined;
        if(gs_list.length > 0) {
            gs_list_title = <h4>Generated sentences</h4>
        }

        return (
            <div>
                {gs_list_title}
                <ListGroup>{gs_list}</ListGroup>
            </div>
        );
    }
}
