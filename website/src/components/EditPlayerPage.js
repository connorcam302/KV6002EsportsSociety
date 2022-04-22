import React from "react";
import { Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditPlayerForm from "./EditPlayerForm";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import Helmet from "react-helmet";



/**
* EditPlayerPage
* 
* This page will submit player data to the database to allow players to edit their profile and 
* account details.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo -Fix bug with player's current info not being added to the fields by default.
*/

    



export default class EditPlayerPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id:"",
            isAdmin:"",
            newEmail:"",
            newign: "",
            newFirstName:"",
            newLastName:"",
            newTwitch:"",
            newTwitter:"",
            newInstagram:"",
            newPicture:"",
            results:[],
            sucess: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleIGN = this.handleIGN.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleTwitch = this.handleTwitch.bind(this);
        this.handleTwitter = this.handleTwitter.bind(this);
        this.handleInstagram = this.handleInstagram.bind(this);
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
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/player?id="
        this.fetchData(url)

    }

    filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
      };
    
    /**
    * handle--
    * 
    * Used to submit form data to the state for future use.
    */
    

    handleEmail = (e) => {
        this.setState({ newEmail: e.target.value })
    }    
    handleIGN = (e) => {
        this.setState({ newign: e.target.value })
    }    
    handleFirstName = (e) => {
        this.setState({ newFirstName: e.target.value })
    }    
    handleLastName = (e) => {
        this.setState({ newLastName: e.target.value })
    }    
    handleTwitch = (e) => {
        this.setState({ newTwitch: e.target.value })
    }    
    handleTwitter = (e) => {
        this.setState({ newTwitter: e.target.value })
    }    
    handleInstagram = (e) => {
        this.setState({ newInstagram: e.target.value })
    }    

    /**
    * handleSubmitClick()
    * 
    * When the submit button is clicked, the state data is taken and submitted to the 'api/editplayer' endpoint in order to update the
    * player data with data from the state. If any of the mandatory fields are left empty, the data will not be submitted.
    */
    
    
    handleSubmitClick = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/editplayer"

        let formData = new FormData();
        formData.append('email', this.state.newEmail);
        formData.append('ign', this.state.newign);
        formData.append('first', this.state.newFirstName);
        formData.append('last', this.state.newLastName);
        formData.append('twitch', this.state.newTwitch);
        formData.append('twitter', this.state.newTwitter);
        formData.append('instagram', this.state.newInstagram);
        formData.append('id', this.props.playerid);

        if (this.state.email === null || !this.state.ign === null  || !this.state.firstName === null  || !this.state.lastName === null ) {
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

   render() {
    let playerEmail;
    let playerIGN;
    let playerFirstName;
    let playerLastName;
    let playerTwitch;
    let playerTwitter;
    let playerInstagram;

    let message = this.state.message

    this.state.results.map( (player) => (playerEmail = player.user_email))
    this.state.results.map( (player) => (playerIGN = player.user_ign))
    this.state.results.map( (player) => (playerFirstName = player.user_firstName))
    this.state.results.map( (player) => (playerLastName = player.user_lastName))
    this.state.results.map( (player) => (playerTwitch = player.user_twitch))
    this.state.results.map( (player) => (playerTwitter = player.user_twitter))
    this.state.results.map( (player) => (playerInstagram = player.user_instagram))

    console.log(playerIGN)

        /*
        * Checks if the user is attempting to edit their own profile, or is an admin. If 
        * they are neither, they will not be able to interact with the page.
        */
       if(this.state.user_id == this.props.playerid || this.state.isAdmin == 1){
        return(
            <div>
                <Helmet>
                <title>Edit Player</title>
                </Helmet>
                <Typography variant="h1" align="center">
                    {playerIGN}
                </Typography>
                <Typography variant="h2">
                    Edit Page
                </Typography>
                <EditPlayerForm
                    playerid={this.props.playerid}
                    playerEmail={playerEmail}
                    handleEmail={this.handleEmail}
                    playerIGN={playerIGN}
                    handleIGN={this.handleIGN}
                    playerFirstName={playerFirstName}
                    handleFirstName={this.handleFirstName}
                    playerLastName={playerLastName}
                    handleLastName={this.handleLastName}
                    playerTwitch={playerTwitch}
                    handleTwitch={this.handleTwitch}
                    playerTwitter={playerTwitter}
                    handleTwitter={this.handleTwitter}
                    playerInstagram={playerInstagram}
                    handleInstagram={this.handleInstagram}

                    handleSubmitClick={this.handleSubmitClick}
                />
                <Typography>{message}</Typography>
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
