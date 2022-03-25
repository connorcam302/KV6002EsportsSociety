import React from "react";

class ManageTeamsForm extends React.Component {
    render() {
        return (
            <div>

                <button onClick={this.props.handleManageTeamsClick}>Submit team</button>
            </div>
        );
    }
}

export default ManageTeamsForm;