import * as React from "react";
import Button from '@mui/material/Button';
/**
*
* @author Ethan Borrill W18001798
* 
* 
*/
class NewTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
        }
    }

    componentDidMount() {
        let urlTeam = "http://unn-w19024957.newnumyspace.co.uk/KV6002/Assessment/api/team"
        this.fetchDataTeam(urlTeam)
    }

    


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
                    <div class="row uniform">
                        <div >
                            <label>Team Name</label>
                                <div>
                                    <input
                                        type='text'
                                        value={this.props.team_name}
                                        onChange={this.props.handleTeamName}
                                    />
                                </div>
                        </div>
                            <ul>
                                <label>
                                    <select value={this.props.game_id} onChange={this.props.handleGameSelect}>
                                    <option value="">Select a Game</option>
                                    {this.state.teams.map((team) => <option value={team.game_id}>{team.game_name}</option>)}
                                    </select>
                                </label>
                            </ul>

                            <ul><Button onClick={this.props.handleTeamSubmit}>Submit Team</Button></ul>
                    </div>
        );
    }
}


export default NewTeam;