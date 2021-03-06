import React from "react";
import { TextField, Box, Button, Typography, Input } from "@mui/material";
import { Link } from "react-router-dom";


/**
* EditTeamForm
* 
* Returns a form for entering player data, this data is returned back to the parent state.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo - Fix bug with default values not showing.
*/


export default class EditPlayerForm extends React.Component {

    makePlayerPath = (id) => {
        return "../player/" + id
    }

    constructor(props){
        super(props)
        this.state = {
            playerEmail: "",
            playerIGN: "",
            playerFirstName: "",
            playerLastName: "",
            playerTwitch: "",
            playerTwitter: "",
            playerInstagram: "",
        }
    }

    render() {
        return (
            <div>
                <Box sx={{padding:2}}>
                <Typography>Profile Picture</Typography>
                <Input 
                    type="file" 
                    name="fileToUpload" 
                    id="fileToUpload" 
                    onChange={this.props.handlePicture} />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="Email"
                        defaultValue={this.state.playerEmail}
                        value={this.props.email} 
                        onChange={this.props.handleEmail} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="IGN"
                        defaultValue={this.state.playerIGN}
                        value={this.props.ign} 
                        onChange={this.props.handleIGN} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="First Name"
                        defaultValue={this.state.playerFirstName}
                        value={this.props.firstName} 
                        onChange={this.props.handleFirstName} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="Last Name"
                        defaultValue={this.state.playerLastName}
                        value={this.props.lastName} 
                        onChange={this.props.handleLastName} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="Bio"
                        defaultValue={this.state.playerBio}
                        value={this.props.bio} 
                        onChange={this.props.handleBio} 
                        variant="filled"
                        multiline="true"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        label="Twitch Name"
                        defaultValue={this.state.playerTwitch}
                        value={this.props.twitch} 
                        onChange={this.props.handleTwitch} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        label="Twitter"
                        defaultValue={this.state.playerTwitter}
                        value={this.props.firstName} 
                        onChange={this.props.handleTwitter} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        label="Instagram Name"
                        defaultValue={this.state.playerInstagram}
                        value={this.props.instagram}
                        onChange={this.props.handleInstagram} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74",
                            width: "30%",
                        }}
                    />
                </Box>
                <Box> 
                    <Link to={this.makePlayerPath(this.props.playerid)}>
                        <Button size="large" sx={{margin:1,backgroundColor:"#D5761D",color: 'white'}}>                        
                            <Typography variant="h6">
                                Return
                            </Typography>
                        </Button>
                    </Link>
                    <Button onClick={this.props.handleSubmitClick} size="large" sx={{margin:1,backgroundColor:"#D5761D",color: 'white'}}>                        
                        <Typography variant="h6">
                            Submit
                        </Typography>
                    </Button>
                </Box>
            </div>
        )
    }
}