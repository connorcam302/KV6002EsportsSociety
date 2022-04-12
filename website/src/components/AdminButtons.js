import * as React from "react";
import Button from '@mui/material/Button';

/**
* AdminButtons
* 
* This class creates the 4 buttons to be used on the admin page of the website, which will be used to navigate between the several forms available for administrators to update or upload content onto the website.
*
* @author Ethan Borrill W18001798
*/

class AdminButtons extends React.Component {
    render() {
        return (
            <div>
                <ul><Button onClick={this.props.handleEventsFormClick}>Add an event</Button></ul>
                <ul><Button onClick={this.props.handleTeamApplicationsClick}>Team Applications</Button></ul>
                <ul><Button onClick={this.props.handleMembersApplicationClick}>Member Applications</Button></ul>
                <ul><Button onClick={this.props.handleTeamAccoladesClick}>Manage Team Accolades</Button></ul>
                <ul><Button onClick={this.props.handleLogoutClick}>Logout </Button></ul>
            </div>
        );
    }
}

export default AdminButtons;