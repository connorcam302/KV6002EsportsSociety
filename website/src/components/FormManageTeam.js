import * as React from "react";
import Button from '@mui/material/Button';

/**
* FormManageTeams
* 
* This class is used to create the form necessary to handle applications to create teams to be displayed on the Teams page of the website.
*
* @author Ethan Borrill W18001798
*/
class FormManageTeams extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.handleManageTeamsClick}>Submit team</Button>
            </div>
        );
    }
}

export default FormManageTeams;