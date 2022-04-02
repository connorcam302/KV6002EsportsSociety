import React from "react";
import TeamPlayers from "./TeamPlayers"
import { Box, Grid, Typography, Button } from "@mui/material";
import ProfilePic from "../img/defaultprofilepicture.png"

export default class TeamPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        return(
            <Box sx={{marginBottom:2,color: "#dedee3", paddingLeft:3,paddingRight:3,marginLeft:"5%",marginRight:"5%", backgroundColor:"#181c29", paddingTop:2, paddingBottom:4,borderRadius: '0px 0px 30px 30px', boxShadow: 10,}}>
            <Box sx={{paddingTop:2,paddingBottom:6}}>
                <Grid container spacing={2} sx={{paddingLeft:2}}>
                    <img src={ProfilePic} className="profliepic"/>
                    <Box sx={{paddingTop: "2.5%", paddingLeft: 2, textAlign:"left", display: "block"}}>
                        <Typography variant="h1">
                            Team Name
                        </Typography>
                        <Typography variant="h2">
                            Game Played
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
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx={{backgroundColor:"red", borderRadius: '10px 10px 10px 10px', borderBlockColor:"white", borderStyle:"solid"}}>
                        <TeamPlayers teamid="7"/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                xs=4
                </Grid>
                <Grid item xs={4}>
                xs=4
                </Grid>
                <Grid item xs={8}>
                xs=8
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