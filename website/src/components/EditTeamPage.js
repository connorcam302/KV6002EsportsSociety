import React from "react";
import { Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditTeamForm from "./EditTeamForm";

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
        let url = "http://localhost/KV6002/Assessment/api/team?id="
        this.fetchData(url)
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }    
    
    handleSubmitClick = () => {
        let url = "http://unn-w18003255.newnumyspace.co.uk/KV6002/Assessment/api/editteam"

        let formData = new FormData();
        formData.append('id', this.props.teamid);
        formData.append('name', this.state.name);
        

        console.log(formData)

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState(
                        {
                            success: true
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
    let errorMessage = this.state.error

    this.state.results.map( (team) => teamLead = team.team_lead)
    this.state.results.map( (team) => teamName = team.team_name)

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
