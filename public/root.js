import React from "react";
import ReactDOM from "react-dom";

import Switcher from "./switcher";
import Text from "./text";
import Reddit from "./reddit";

export default class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = { view: "Text" };
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    handleSwitch() {
        this.setState({ view:
            (this.state.view == "Text") ? "Reddit" : "Text"
        });
    }

    render() {
        var disp_comp = undefined;

        if(this.state.view == "Text") {
            disp_comp = <Text />;
        } else {
            disp_comp = <Reddit />;
        }

        return (
            <div>
                <Switcher
                    label={(this.state.view == "Text") ? "Reddit" : "Text"}
                    onSwitch={this.handleSwitch}
                />
                { disp_comp }
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));
