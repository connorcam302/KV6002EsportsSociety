import React from "react";

class ManageTeamsForm extends React.Component {
    render() {
        return (
            <div>
                <h1>Manage your Teams here!</h1>
                <button onClick={this.props.handleManageTeamsClick}>Submit team</button>
            </div>
        );
    }
}

export default ManageTeamsForm;