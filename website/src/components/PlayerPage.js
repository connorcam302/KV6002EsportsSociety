import React from "react";
import TeamPlayers from "./TeamPlayers"
import PlayerResults from "./PlayerResults"
import PlayerStats from "./PlayerStats"
import PlayerTeams from "./PlayerTeams"
import PlayerAccolades from "./PlayerAccolades"
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfilePic from "../img/defaultprofilepicture.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FaInstagram, FaTwitter, FaTwitch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TwitchEmbed } from "react-twitch-embed";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import jwt_decode from "jwt-decode";
import Helmet from "react-helmet";


/**
* PlayerPage
* 
* Creates a player page and returns it in component format. Uses a playerid supplied in props to create a profile
* for the player. Uses the 'api/player' endpoint to get information on the player, and the PlayerResults, PlayerStats
* PlayerTeams and PlayerAccolades components to display information.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/


export default class PlayerPage extends React.Component {

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
    * the playerid supplied in props will be returned.
    */

    componentDidMount() {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/player?id="
        this.fetchData(url)
    }

    /**
    * fetchData(url)
    * 
    * Fetches API data from a given URL with a player ID appended. The data is stored in state.
    */

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

    makeEditPath = (id) => {
        return "../editplayer/" + id
    }

    render() {
        let playerIGN;
        let playerName;
        let playerBio;
        let playerTwitch;
        let playerTwitter;
        let playerInstagram;
        let playerPicture;
        let playerPictureURL;
        

        let twitchPopout;
        let twitterPopout;

        let twitter;
        let twitch;
        let instagram;

        let editButton = ""

        this.state.results.map( (player) => playerIGN = player.user_ign)
        this.state.results.map( (player) => playerName = (player.user_firstName + " " + player.user_lastName))
        this.state.results.map( (player) => playerBio = player.user_bio)
        this.state.results.map( (player) => playerTwitch = player.user_twitch)
        this.state.results.map( (player) => playerTwitter = player.user_twitter)
        this.state.results.map( (player) => playerInstagram = player.user_instagram)
        this.state.results.map( (player) => playerPictureURL = player.user_profilepicture)

        if(playerPictureURL){
            playerPicture = <img src={playerPictureURL} className="profliepic"/>
        } else {
            playerPicture = (<img src={ProfilePic} className="profliepic"/>)
        }

        /*
        * Checking for player socials, if they have them links to them will be provided in the top right
        * of the page. If the website has a popout component available, such as twitch and twitter, these
        * will also be included.
        */

        if(playerTwitter && playerTwitter !==  !null) {
            let twitterlink = "https://www.twitter.com/" + playerTwitter + "/";
            twitterPopout = (
                <TwitterTimelineEmbed
                sourceType="profile"
                screenName={playerTwitter}
                options={{height: 480, width: "100%", theme: 'dark'}}
                
            />
            )
            twitter = (
                <a href={twitterlink} target="_blank">
                    <Typography variant="h4">
                        <FaTwitter/> /{playerTwitter}
                    </Typography>
                </a>
            )
            
        }

        if(playerTwitch && playerTwitch !== null) {
            let twitchlink = "https://www.twitch.tv/" + playerTwitch + "/";
            twitchPopout = (
                <TwitchEmbed
                width="100%"
                height = "480px"
                channel={playerTwitch}
                id={playerTwitch}
                theme="dark"
                muted />
            )
            twitch = (
                <a href={twitchlink} target="_blank">
                    <Typography variant="h4">
                        <FaTwitch/> /{playerTwitch}
                    </Typography>
                </a>
            )
        }

        if(playerInstagram && playerInstagram !==  !null) {
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

        /*
        * Checks if the player is on their own page or an admin, if either of these is true an edit page
        * button will be displayed linking to the page for editing user profiles.
        */

        if(localStorage.getItem("UserLoginToken")) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            if(decodedToken.user_isAdmin == 1 || decodedToken.user_id == this.props.playerid) {
                editButton = (
                    <Link to={this.makeEditPath(this.props.playerid)}>
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
            <Helmet>
                <title>{playerIGN}</title>
            </Helmet>
            <Box sx={{paddingTop:2,paddingBottom:3}}>
                <Grid container spacing={2} sx={{paddingLeft:2}}>
                    {playerPicture}
                    <Box sx={{paddingTop: "2.5%", paddingLeft: 2, textAlign:"left", display: "block"}}>
                        <Typography variant="h1">
                            {playerIGN}
                        </Typography>
                        <Typography variant="h2">
                            {playerName}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'block', marginLeft: "auto", marginRight: 2}}>
                        <Box sx={{display: 'block', marginLeft: "auto", marginRight: 2}}>
                            {editButton}
                        </Box>
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
                    <Box sx={{backgroundColor:"#424242", borderRadius: '10px 10px 10px 10px', border: "3px solid #D5761D", height: "100%"}}>
                        <Typography sx={{padding:2}}>
                            {playerBio}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#424242", borderRadius: '10px 10px 10px 10px', border: "3px solid #D5761D", height: "100%",paddingLeft:1, paddingRight:1,}}>
                    <PlayerResults playerid={this.props.playerid}/>
                </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{backgroundColor:"#424242", borderRadius: '10px 10px 10px 10px', border: "3px solid #D5761D", height: "100%",paddingLeft:1, paddingRight:1,}}>
                        <PlayerTeams playerid={this.props.playerid}/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#424242", borderRadius: '10px 10px 10px 10px', border: "3px solid #D5761D", height: "100%",paddingLeft:1, paddingRight:1,}}>
                    <PlayerStats playerid={this.props.playerid}/>
                </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{backgroundColor:"#424242", borderRadius: '10px 10px 10px 10px', border: "3px solid #D5761D", height: "100%",paddingLeft:1, paddingRight:1,}}>
                    <PlayerAccolades playerid={this.props.playerid}/>
                </Box>
                </Grid>
                <Grid item xs={8}>
                    {twitchPopout}
                </Grid>
                <Grid item xs={4}>
                    {twitterPopout}
                </Grid>
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