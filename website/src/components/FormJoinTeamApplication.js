import * as React from "react";
import Button from '@mui/material/Button';
import FormJoinTeamDetails from "./FormJoinTeamDetails";

/**
* FormJoinTeam
* 
* This class is used to create the form necessary to handle applications to Assign users to a team, this form is used on the 'Member applications' page of the Admin page.
*
* @author Ethan Borrill W18001798
*/
class FormJoinTeam extends React.Component {


    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the pendingMembers API, this is then used within the dropdown box by being assigned to the URL variable.
    *
    */
    componentDidMount() {
        let urlPlayers = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/pendingmembers"
        this.fetchDataPlayers(urlPlayers)
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
    * fetchDataPlayers
    * 
    * Function retrieves the data collected from the pendingMember API URL and sets the value of 'Results' to contain the relevant data.
    *
    * @param [type] $[var]   [Description]
    */
    fetchDataPlayers = (urlPlayers) => {
        if (this.props.user_id !== undefined && this.props.user_id !== "") {
            url += "?id=" + this.props.user_id
        }
        fetch(urlPlayers)
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
    * Renders the content needed to display the Member join team application form.
    *
    */
    render() {

        return (
            <div>
                {this.state.results.map((pendingMembers, i) => (<FormJoinTeamDetails key={i} pendingMembers={pendingMembers} />))}

                <ul>
                    <label>
                        <select value={this.props.user_id} onChange={this.props.handleMemberSubmissionsSelect}>
                            <option value="">Select a member application here</option>
                            {this.state.results.map((pendingMembers) => <option value={pendingMembers.user_id}>{pendingMembers.user_ign}</option>)}
                        </select>
                    </label>
                </ul>
                <div>
                    <Button onClick={this.props.handleMemberFormDecline}>Decline Submission</Button>
                    <Button onClick={this.props.handleMemberFormApprove}>Approve Submission</Button>
                </div>
            </div>
        );
    }
}

export default FormJoinTeam;