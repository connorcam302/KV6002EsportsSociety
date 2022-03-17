import React from "react";

/**
 * Creates the Logout button to be used on the Viewlist Page, implementing the handleLogoutClick prop to the button to allow the logout function to be performed.
 * 
 * @author Ethan Borrill W18001798
 */
class Logout extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleLogoutClick}>Log out</button>
            </div>
        );
    }
}

export default Logout;