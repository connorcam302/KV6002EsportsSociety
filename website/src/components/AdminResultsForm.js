import * as React from "react";
import Button from '@mui/material/Button';

/**
* ResultsForm
* 
* This class is used to create the form necessary to create and upload new sets of match
history for the website
*
* @author Jacob Clark w18003237
* @collab Ethan Borrill
*/

class AdminResultsForm extends React.Component {



     /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the teams API, this is then assigned to the urlTeam to be used in the dropdown boxes.
    *
    */
    componentDidMount() {
        let urlTeam = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team"
        this.fetchDataTeam(urlTeam)
    }

    /**
    * Constructor
    * 
    * Used within this class to initialise several values used within the file, such as an empty data array for teams.
    *
    */
     constructor(props) {
        super(props);
        this.state = {
            results: [],
            teams: [],
        }
    }

    /**
    * fetchDataTeam
    * 
    * Function retrieves the data collected from the Teams API URL and sets the value of 'teams' to be the relevant data.
    *
    */
     fetchDataTeam = (urlTeam) => {
        
        fetch(urlTeam)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ teams: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }


    render() {
        return (
            <div>
                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleMatchTeam}>
                            <option value="">Select a team here</option>
                            {this.state.teams.map((team) => <option value={team.team_id}>{team.team_name}</option>)}
                        </select>
                    </label>
                </ul>

                <ul><input
                    type='text'
                    placeholder='Opponent'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchOpponent}
                /></ul>

                <ul><input
                    type='date'
                    placeholder='Date of the games played'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchDate}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Results total for each team'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchResults}
                /></ul>

                <ul><Button onClick={this.props.handleMatchSubmit}>Submit Results</Button></ul>
            </div>
        );
    }
}

export default AdminResultsForm;