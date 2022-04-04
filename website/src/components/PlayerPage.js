import React from "react";
import TeamPlayers from "./TeamPlayers"
import TeamResults from "./TeamResults";
import TeamStats from "./TeamStats"
import TeamAccolades from "./TeamAccolades"
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfilePic from "../img/defaultprofilepicture.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FaInstagram, FaTwitter, FaTwitch } from "react-icons/fa";
import { TwitchPlayer } from "react-twitch-embed";
import { Link } from "react-router-dom";


export default class PlayerPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    componentDidMount() {
        let url = "http://localhost/KV6002/Assessment/api/player?id="
        this.fetchData(url)
    }

    fetchData = (url) => {
        url += this.props.playerid
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
        let playerIGN;
        let playerName;
        let playerTwitch;
        let playerTwitter;
        let playerInstagram;

        let twitter;
        let twitch;
        let instagram;

        this.state.results.map( (player) => playerIGN = player.user_ign)
        this.state.results.map( (player) => playerName = (player.user_firstName + " " + player.user_lastName))
        this.state.results.map( (player) => playerTwitch = player.user_twitch)
        this.state.results.map( (player) => playerTwitter = player.user_twitter)
        this.state.results.map( (player) => playerInstagram = player.user_instagram)

        if(playerTwitter) {
            let twitterlink = "https://www.twitter.com/" + playerTwitter + "/";
            twitter = (
                <a href={twitterlink} target="_blank">
                    <Typography variant="h4">
                        <FaTwitter/> /{playerTwitter}
                    </Typography>
                </a>
            )
        }

        if(playerTwitch) {
            let twitchlink = "https://www.twitch.tv/" + playerTwitch + "/";
            twitch = (
                <a href={twitchlink} target="_blank">
                    <Typography variant="h4">
                        <FaTwitch/> /{playerTwitch}
                    </Typography>
                </a>
            )
        }

        if(playerInstagram) {
            let iglink = "https://www.instagram.com/" + playerInstagram + "/";
            instagram = (
                <a href={iglink} target="_blank">
                    <Box>
                        <Typography variant="h4">
                            <FaInstagram/> /{playerInstagram}
                        </Typography>
                    </Box>
                </a>
            )
        }

        return(
            <Box sx={{marginBottom:2, paddingLeft:3,paddingRight:3,marginLeft: 10,marginRight:10, paddingTop:2, paddingBottom:4,}}>
            <Box sx={{paddingTop:2,paddingBottom:3}}>
                <Grid container spacing={2} sx={{paddingLeft:2}}>
                    <img src={ProfilePic} className="profliepic"/>
                    <Box sx={{paddingTop: "2.5%", paddingLeft: 2, textAlign:"left", display: "block"}}>
                        <Typography variant="h1">
                            {playerIGN}
                        </Typography>
                        <Typography variant="h2">
                            {playerName}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'block', marginLeft: "auto", marginRight: 2}}>
                        <Button size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block', marginLeft: "auto",}}>                        
                            <Typography variant="h6">
                                Edit Page
                            </Typography>
                        </Button>
                        <List>
                            <ListItem>
                                {twitter}
                            </ListItem>
                            <ListItem>
                                {twitch}
                            </ListItem>
                            <ListItem>
                                {instagram}
                            </ListItem>

                        </List>
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