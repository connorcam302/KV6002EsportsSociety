import React from "react";
import TeamPlayers from "./TeamPlayers"
import TeamResults from "./TeamResults";
import TeamStats from "./TeamStats"
import TeamAccolades from "./TeamAccolades"
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfilePic from "../img/defaultprofilepicture.png"
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

/**
* TeamPage 
* 
* Creates a team page and returns it in component format. Uses a teamid supplied in props to create a profile
* for the team. Uses the 'api/team' endpoint to get information on the player, and the TeamResults, TeamStats
* TeamPlayers and TeamAccolades components to display information.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class TeamPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/team' regarding 
    * the teamid supplied in props will be returned.
    */

    componentDidMount() {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team?id="
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

    makeEditPath = (id) => {
        return "../editteam/" + id
    }
    
    render() {
        let teamName;
        let teamGame;
        let teamLead;
        let editButton = ""
        this.state.results.map( (team) => teamName = team.team_name)
        this.state.results.map( (team) => teamGame = team.game_name)
        this.state.results.map( (team) => teamLead = team.team_lead)
        
        /*
        * Checks if the user is the team lead or an admin, if either of these is true an edit page
        * button will be displayed linking to the page for editing user profiles.
        */

        if(localStorage.getItem("UserLoginToken")) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            if(decodedToken.user_isAdmin == 1 || decodedToken.user_id == teamLead) {
                editButton = (
                    <Link to={this.makeEditPath(this.props.teamid)}>
                        <Button size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block'}}>                        
                            <Typography variant="h6">
                                Edit Page
                            </Typography>
                        </Button>
                    </Link>
                )
            }
        }

        return(
            <Box sx={{marginBottom:2, paddingLeft:3,paddingRight:3,marginLeft: 10,marginRight:10, paddingTop:2, paddingBottom:4,}}>
            <Box sx={{paddingTop:2,paddingBottom:3}}>
                <Grid container spacing={2} sx={{paddingLeft:2}}>
                    <img src={ProfilePic} className="profliepic" style={{width:"20%", borderRadius: '5% 5% 5% 5%'}}/>
                    <Box sx={{paddingTop: "2.5%", paddingLeft: 2, textAlign:"left", display: "block"}}>
                        <Typography variant="h1">
                            {teamName}
                        </Typography>
                        <Typography variant="h2">
                            {teamGame}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'block', marginLeft: "auto", marginRight: 2}}>
                        {editButton}
                    </Box>
                </Grid>
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={8}>
                    <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", height: "100%"}}>
                        <TeamPlayers teamid={this.props.teamid}/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", width: "100%", paddingLeft:1, paddingRight:1,}}>
                    <TeamResults teamid={this.props.teamid}/>
                </Box>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", width: "100%",paddingLeft:1, paddingRight:1,}}>
                    <TeamStats teamid={this.props.teamid}/>
                </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", height: "100%",paddingLeft:1, paddingRight:1,}}>
                    <TeamAccolades teamid={this.props.teamid}/>
                </Box>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            </Box>
        )
    }
}


