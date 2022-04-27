import React from "react";
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

/**
* Router
* 
*  Allows for routing between the pages using URl paths.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class Router extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            teamResults : [],
            playerResults : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. Obtains data from both the 'api/player' and 'api/team'
    * endpoints.
    */

    componentDidMount() {
        this.fetchPlayerData()
        this.fetchTeamData()
    }

    /**
    * fetchPlayerData(url)
    * 
    * Fetches API data for all players. The data is stored in state.
    */

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

    /**
    * fetchTeamData(url)
    * 
    * Fetches API data for all teams. The data is stored in state.
    */

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

    
    /**
    * makeTeamPath
    * 
    * Creates the path in order to route to a specific team's page.
    *
    * @param String id   The ID of the team.
    * 
    * @return String
    */
    
    makeTeamPath = (id) => {
        return "team/" + id
    }

    /**
    * makePlayerPath
    * 
    * Creates the path in order to route to a specific player's page.
    *
    * @param String id   The ID of the player.
    * 
    * @return String
    */

    makePlayerPath = (id) => {
        return "player/" + id
    }

    /**
    * makeEditTeamPath
    * 
    * Creates the path in order to route to a specific team's edit page.
    *
    * @param String id   The ID of the team.
    * 
    * @return String
    */

    makeEditTeamPath = (id) => {
        return "editteam/" + id
    }

    /**
    * makeEditPlayerPath
    * 
    * Creates the path in order to route to a specific player's edit page.
    *
    * @param String id   The ID of the player.
    * 
    * @return String
    */

    makeEditPlayerPath = (id) => {
        return "editplayer/" + id
    }

    /**
    * render()
    * 
    * Creates all of the paths to the various pages, for pages that's occurance are static such as admin or results, they have
    * a predefined path. For pages that may be added over time, such as player pages, the list of players is iterated through
    * creating a page for each with the url being "players/theirID".
    * 
    * @return JSX Obj
    */

    render() {
        return(
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/">
                  <Route index element={<WeeklyEventsPage/>} />
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