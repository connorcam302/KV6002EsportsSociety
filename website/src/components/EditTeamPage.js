import React from "react";
import { Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import EditTeamForm from "./EditTeamForm";

/**
* EditTeamPage
* 
* This page will submit team data to the database to allow team leads to edit team details.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo -Fix bug with the teams's current info not being added to the fields by default.
*/

export default class EditTeamPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id:"",
            lead_id:"",
            isAdmin:"",
            name:"",
            results:[],
            sucess: ""
        }
        this.handleName = this.handleName.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            this.setState({
                user_id: decodedToken.user_id,
                isAdmin: decodedToken.user_isAdmin
            })
        }
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team?id="
        this.fetchData(url)
    }

    /**
    * handle--
    * 
    * Used to submit form data to the state for future use.
    */
    

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }    

    /**
    * handleSubmitClick()
    * 
    * When the submit button is clicked, the state data is taken and submitted to the 'api/editteam' endpoint in order to update the
    * team data with data from the state.
    */
    
    handleSubmitClick = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/editteam"

        let formData = new FormData();
        formData.append('id', this.props.teamid);
        formData.append('name', this.state.name);
        
        if (this.state.name === null){
            this.setState({ message: "Please fill all required fields." })
        } else {
            fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState(
                        {
                            success: true,
                            message: "Details Successfully Updated"
                        }
                    )
                    console.log("Team Name Changed.")
                } else if (this.state.email === null) {
                    this.setState({ error: "Please enter a team name." })
                } 
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
        }
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
    let teamLead;
    let teamName;
    let message = this.state.message;

    this.state.results.map( (team) => teamLead = team.team_lead)
    this.state.results.map( (team) => teamName = team.team_name)

        /*
        * Checks if the user is the leader of the team attemting to be editted, or is an admin. If 
        * they are neither, they will not be able to interact with the page.
        */
       if(this.state.user_id == teamLead || this.state.isAdmin == 1){
        return(
            <div>
                <Typography variant="h1" align="center">
                    {teamName}
                </Typography>
                <Typography variant="h2">
                    Edit Page
                </Typography>
                <EditTeamForm
                    teamid={this.props.teamid}
                    teamName={teamName}
                    handleName={this.handleName}
                    handleSubmitClick={this.handleSubmitClick}
                />
                {message}
            </div>
        )
       } else {
           return(
            <Typography>
                You do not have access to this page.
            </Typography>
           )
       }
    }
}
