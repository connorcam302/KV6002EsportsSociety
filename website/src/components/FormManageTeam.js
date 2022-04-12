import * as React from "react";
import Button from '@mui/material/Button';
import FormManageTeamDetails from "./FormManageTeamDetails";

/**
* FormManageTeams
* 
* This class is used to create the form necessary to handle applications to create teams, this form is used on the 'Team applications' page of the Admin page.
*
* @author Ethan Borrill W18001798
*/
class FormManageTeam extends React.Component {


    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the pendingTeams API, this is then used within the dropdown box by being assigned to the URL variable.
    *
    */
    componentDidMount() {
        let urlTeams = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team"
        this.fetchDataTeams(urlTeams)
    }

    /**
   * Constructor
   * 
   * Used within this class to initialise several values used within the file, such as an empty data array for accolades and teams.
   *
   */
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    /**
    * fetchDataTeams
    * 
    * Function retrieves the data collected from the team API URL and sets the value of 'Results' to contain the relevant data.
    *
    * @param [type] $[var]   [Description]
    */
    fetchDataTeams = (urlTeams) => {
        if (this.props.team_id !== undefined && this.props.team_id !== "") {
            url += "?id=" + this.props.team_id
        }
        fetch(urlTeams)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ results: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }

    /**
    * render()
    * 
    * Renders the content needed to display the create team application form.
    *
    */
    render() {

        return (
            <div>
                {this.state.results.map((teams, i) => (<FormManageTeamDetails key={i} teams={teams} />))}

                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleTeamSubmissionsSelect}>
                            <option value="">Select a Team Application here</option>
                            {this.state.results.map((pendingTeams) => <option value={pendingTeams.team_id}>{pendingTeams.team_name}</option>)}
                        </select>
                    </label>
                </ul>
                <div>
                    <Button onClick={this.props.handleTeamsFormDecline}>Decline Submission</Button>
                    <Button onClick={this.props.handleTeamsFormApprove}>Approve Submission</Button>
                </div>
            </div>
        );
    }
}

export default FormManageTeam;