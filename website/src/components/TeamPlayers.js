import React from "react";
import ProfilePic from "../img/defaultprofilepicture.png"
import { Tooltip, Box } from "@mui/material";
import { Link } from "react-router-dom"

/**
* PlayerTeams
* 
* Creates a list of players in the team and returns it in component format. Uses the 'api/player' endpoint with a 
* teamid supplied in props to get the list. The players are displayed by their profile picture and are linked
* back to the players profile.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class TeamPlayers extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/player' regarding 
    * the teamid supplied in props will be returned.
    */
   
    componentDidMount() {
        let url = "http://unn-w18003255.newnumyspace.co.uk/KV6002/Assessment/api/player?team="
        this.fetchData(url)
    }

    /**
    * fetchData(url)
    * 
    * Fetches API data from a given URL with a team ID appended. The data is stored in state.
    */

    fetchData = (url) => {
        url += this.props.teamid
        fetch(url)
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    render() {
        let noData = "" 
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }

        function makePlayerLink(id){
            let link = "../player/" + id
            return link
        }

        return(
            <div>
                 <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center',}}>
                    {this.state.results.map( (player) => (
                        <Box sx={{width:"12%", padding:1,}}>
                            <Link to={makePlayerLink(player.user_id)}>
                                <Tooltip title={player.user_ign}>
                                    <img src={ProfilePic} className="profilepic" style={{width:"100%", borderRadius: '5% 5% 5% 5%'}}/>
                                </Tooltip>
                            </Link>
                        </Box>)
                )}
                {noData}
                </Box>
            </div>
        )
    }
}