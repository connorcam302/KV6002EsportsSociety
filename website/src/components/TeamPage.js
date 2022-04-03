import React from "react";
import TeamPlayers from "./TeamPlayers"
import TeamResults from "./TeamResults";
import TeamStats from "./TeamStats"
import TeamAccolades from "./TeamAccolades"
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfilePic from "../img/defaultprofilepicture.png"


export default class TeamPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    componentDidMount() {
        let url = "http://localhost/KV6002/Assessment/api/team?id="
        this.fetchData(url)
    }

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
        let teamName;
        let teamGame;
        this.state.results.map( (team) => teamName = team.team_name)
        this.state.results.map( (team) => teamGame = team.game_name)

        return(
            <Box sx={{marginBottom:2, paddingLeft:3,paddingRight:3,marginLeft: 10,marginRight:10, paddingTop:2, paddingBottom:4,}}>
            <Box sx={{paddingTop:2,paddingBottom:3}}>
                <Grid container spacing={2} sx={{paddingLeft:2}}>
                    <img src={ProfilePic} className="profliepic"/>
                    <Box sx={{paddingTop: "2.5%", paddingLeft: 2, textAlign:"left", display: "block"}}>
                        <Typography variant="h1">
                            {teamName}
                        </Typography>
                        <Typography variant="h2">
                            {teamGame}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'block', marginLeft: "auto", marginRight: 2}}>
                        <Button size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block'}}>                        
                            <Typography variant="h6">
                                Edit Page
                            </Typography>
                        </Button>
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
                <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", height: "100%",paddingLeft:1, paddingRight:1,}}>
                    <TeamResults teamid={this.props.teamid}/>
                </Box>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#787878", borderRadius: '10px 10px 10px 10px', border: "3px solid black", height: "100%",paddingLeft:1, paddingRight:1,}}>
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

{/* <Grid container spacing={2}>
<Grid item sx={8}>
    <Box>
        <TeamPlayers teamid="7"/>
    </Box>
</Grid>
<Grid item sx={2}>
    <Box xs={{width:"100%", backgroundColor:"red"}}>testtse</Box>
</Grid>
</Grid> */}