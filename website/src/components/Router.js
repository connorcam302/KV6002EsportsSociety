import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from "@mui/material";
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import LoginRegisterPage from './LoginRegisterPage';
import AdminPage from './AdminPage'
import ErrorPage from './ErrorPage'
import TeamPage from './TeamPage';
import PlayerPage from './PlayerPage'
import AllTeamsPage from './AllTeamsPage'
import EditTeamPage from "./EditTeamPage";
import EditPlayerPage from "./EditPlayerPage";
import ResultsPage from "./ResultsPage";
import WeeklyEventsPage from "./WeeklyEventsPage";

export default class Router extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            teamResults : [],
            playerResults : []
        }
    }

    componentDidMount() {
        this.fetchPlayerData()
        this.fetchTeamData()
    }

    // componentDidUpdate(prevProps) {
    //     this.fetchPlayerData()
    //     this.fetchTeamData()
    // }

    fetchPlayerData = () => {
        let playerUrl = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/player"
        fetch(playerUrl)
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({playerResults:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    fetchTeamData = () => {
        let teamUrl = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team"
        fetch(teamUrl)
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({teamResults:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    makeTeamPath = (id) => {
        return "team/" + id
    }

    makePlayerPath = (id) => {
        return "player/" + id
    }

    makeEditTeamPath = (id) => {
        return "editteam/" + id
    }

    makeEditPlayerPath = (id) => {
        return "editplayer/" + id
    }

    render() {
        return(
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/">
                  <Route index element={<Homepage/>} />
                  <Route path="login" element={<LoginRegisterPage />} />
                  <Route path="admin" element={<AdminPage />} />
                  <Route path="results" element={<ResultsPage />} />
                  <Route path="team" element={<AllTeamsPage />} />
                  <Route path="events" element={<WeeklyEventsPage/>} />
                  {this.state.teamResults.map( (team) => ( <Route path={this.makeTeamPath(team.team_id)} element={<TeamPage teamid={team.team_id}/>} /> ))}
                  {this.state.teamResults.map( (team) => ( <Route path={this.makeEditTeamPath(team.team_id)} element={<EditTeamPage teamid={team.team_id}/>} /> ))}
                  {this.state.playerResults.map( (player) => ( <Route path={this.makePlayerPath(player.user_id)} element={<PlayerPage playerid={player.user_id}/>} /> ))}
                  {this.state.playerResults.map( (player) => ( <Route path={this.makeEditPlayerPath(player.user_id)} element={<EditPlayerPage playerid={player.user_id}/>} /> ))}
                  <Route path="*" element={<ErrorPage/>} />
                </Route>
              </Routes>
            </BrowserRouter>
            )
        }
}