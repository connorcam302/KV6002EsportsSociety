import * as React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


class TeamSubmissionForm extends React.Component {

    componentDidMount() {
        let urlGames = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/games"
        this.fetchDataGames(urlGames)

        let urlPlayers = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/player"
        this.fetchDataPlayers(urlPlayers)
    }


    constructor(props) {
        super(props);
        this.state = {
            results: [],
            players: [],
            games: [],
        }
    }

    fetchDataGames = (urlGames) => {
        fetch(urlGames)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ games: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }

    fetchDataPlayers = (urlPlayers) => {
        fetch(urlPlayers)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ players: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }



    render() {
        return (
            <div class="row uniform">
                <ul><Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                Create a new Team
                </Typography></ul>
                <ul><input
                    type='text'
                    placeholder='Team Name'
                    value={this.props.team_name}
                    onChange={this.props.handleTeamName}
                /></ul>

                <ul>
                    <label>
                        <select value={this.props.game_id} onChange={this.props.handleGameSelect}>
                            <option value="">Select a game your team will play</option>
                            {this.state.games.map((game) => <option value={game.game_id}>{game.game_name}</option>)}
                        </select>
                    </label>
                </ul>

                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleTeamSelect}>
                            <option value="">Who will be your team captain?</option>
                            {this.state.players.map((player) => <option value={player.user_id}>{player.user_ign}</option>)}
                        </select>
                    </label>
                </ul>
                <ul><Button onClick={this.props.handleTeamSubmit}>Submit Team</Button></ul>
            </div>
        );
    }
}


export default TeamSubmissionForm;