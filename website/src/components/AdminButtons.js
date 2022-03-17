import React from "react";

/**
 * Creates the Logout button to be used on the Viewlist Page, implementing the handleLogoutClick prop to the button to allow the logout function to be performed.
 * 
 * @author Ethan Borrill W18001798
 */
class AdminButtons extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleEventsFormClick}>Add events</button>
                <button onClick={this.props.handleManageTeamsClick}>Manage Teams</button>
                <button onClick={this.props.handleAddMatchesClick}>Add matches</button>
            </div>
        );
    }
}

export default AdminButtons;