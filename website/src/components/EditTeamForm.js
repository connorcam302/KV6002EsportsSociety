import React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

/**
* EditTeamForm
* 
* Returns a form for entering team data, this data is returned back to the parent state.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo - Fix bug with default values not showing.
*/

export default class EditTeamForm extends React.Component {

    makeTeamPath = (id) => {
        return "../team/" + id
    }

    render() {
        return (
            <div>
                <Box sx={{padding:2}}>
                    <TextField 
                        focused 
                        required
                        label="Team Name"
                        defaultValue={this.props.teamName}
                        value={this.props.name} 
                        onChange={this.props.handleName} 
                        variant="filled"
                        style={{
                            backgroundColor: "#827C74"
                        }}
                    />
                </Box>
                <Box>
                    <Link to={this.makeTeamPath(this.props.teamid)}>
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