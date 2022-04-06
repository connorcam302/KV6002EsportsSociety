import React from "react";
import AdminButtons from "./AdminButtons.js";
import jwt_decode from "jwt-decode";
import FormWeeklyEvents from "./FormWeeklyEvents.js";
import FormManageTeams from "./FormManageTeam.js";
import FormWeeklyMatches from "./FormWeeklyMatches";
import FormTeamAccolades from "./FormTeamAccolades.js";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';


/**
* AdminPage
* 
* This class is used to manage the functionalites and content seen within the Administrative pages of the application, which are only accessible by verified users in teh database.
* To check this, the user's webtoken is decoded to check whether the isAdmin value retrieved in association with their account is a value of 1, which will allow them access.
*
* Within this pafe, users can access several forms related to the functions within the website, such as the weekly results page, events and teams - these forms are then used to update content shown on these pages.
*
* @author Ethan Borrill W18001798
*/

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            authenticated: true,
            token: null,
            error: "",
            
            EventsForm: false,
            ManageTeamsForm: false,
            AccoladesForm: false,

            EventTitle: null,
            EventDesc: null,
            EventImage: null,
            EventDate: null,

            TeamDropDown: null,
            AccoladesDropDown: null
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleManageTeamsClick = this.handleManageTeamsClick.bind(this);

        this.handleTeamAccoladesClick = this.handleTeamAccoladesClick.bind(this);
        this.handleTeamAccoladeSelect = this.handleTeamAccoladeSelect.bind(this);
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.handleAccoladeSubmit = this.handleAccoladeSubmit.bind(this);

        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleEventDesc = this.handleEventDesc.bind(this);
        this.handleEventImage = this.handleEventImage.bind(this);
        this.handleEventDate = this.handleEventDate.bind(this);
        this.handleEventSubmit = this.handleEventSubmit.bind(this);

    }


    /**
    * componentDidMount
    * 
    * This function collects any webtoken stored within the browser made when logging into the site, this is then decoded to check the is_admin value stored within.
    * Should the value of the is_admin be 1, admin access is granted - otherwise the unauthorised webpage will be displayed to prevent unwanted access.
    *
    * @param [type] $[var]   [Description]
    */
    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            if (decodedToken.user_isAdmin == 1) {
                this.setState({
                    admin: true
                });
            }
            else if (decodedToken.user_isAdmin == 0) {
                this.setState({
                    admin: false
                });
            }
        }
    
}

    /**
    * handlePassword(e)
    * 
    * Handles the input and change of text within the password field used within the register and login pages.
    *
    */
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    /**
    * handleEmail(e)
    * 
    * Handles the input and change of text within the email field used with the register and login pages.
    *
    */
    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    /**
    * handleLogoutClick
    * 
    * Functionality to handle a users logout click within the collection of buttons on the left hand side, will remove the token from local storage - essentially logging the user out.
    *
    * @param [type] $[var]   [Description]
    */
    handleLogoutClick = () => {
        this.setState(
            {
                admin: false,
                token: null
            }
        )
        localStorage.removeItem('UserLoginToken');
    }

    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    handleEventsFormClick = () => {
        this.setState(
            {
                EventsForm: true,
                ManageTeamsForm: false,
                MatchesForm: false,
                AccoladesForm: false
            }
        )
    }

    handleEventTitle = (e) => {
        this.setState({ EventTitle: e.target.value })
    }

    handleEventDesc = (e) => {
        this.setState({ EventDesc: e.target.value })
    }

    handleEventImage = (e) => {
        this.setState({ EventImage: e.target.value })
    }

    handleEventDate = (e) => {
        this.setState({ EventDate: e.target.value })
    }

    handleEventSubmit = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/eventsform"

        let formData = new FormData();
        formData.append('event_name', this.state.EventTitle);
        formData.append('event_description', this.state.EventDesc);
        formData.append('event_img', this.state.EventImage);
        formData.append('event_date', this.state.EventDate);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState(
                        {
                            EventCreated:true
                        }
                    )
                    return response.json()
                } else if ((this.state.EventTitle === null) && (this.state.EventDesc === null) && (this.state.EventImage === null) && (this.state.EventDate === null)) {
                    this.setState({ error: "Please answer all fields within the form before submitting." })
                } else if (this.state.EventTitle === null) {
                    this.setState({ error: "Please enter a Title for the event." })
                } else if (this.state.EventDesc === null) {
                    this.setState({ error: "Please enter a description for the event." })
                } else if (this.state.EventImage === null) {
                    this.setState({ error: "Please provide an Image to be shown with the event" })
                } else if (this.state.EventDate === null) {
                    this.setState({ error: "Please enter a date for the event." })
                } else if (response.status === 406) {
                    this.setState({ error: "The event details you have entered cannot be used!" })
                } else if (response.status === 403) {
                    this.setState({ error: "Sorry, an event with this name already exists!" })
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    handleManageTeamsClick = () => {
        this.setState(
            {
                EventsForm: false,
                ManageTeamsForm: true,
                MatchesForm: false,
                AccoladesForm: false
            }
        )
    }

    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    handleTeamAccoladesClick = () => {
        this.setState(
            {
                EventsForm: false,
                ManageTeamsForm: false,
                MatchesForm: false,
                AccoladesForm: true
            }
        )
    }

    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    handleTeamSelect = (e) => {
        this.setState({TeamDropDown:e.target.value})
    }

    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    handleTeamAccoladeSelect = (e) => {
        this.setState({AccoladesDropDown:e.target.value})
    }

    handleAccoladeSubmit = () => {
        let url = ""

        let formData = new FormData();
        formData.append('event_name', this.state.EventTitle);
        formData.append('event_description', this.state.EventDesc);
        formData.append('event_img', this.state.EventImage);
        formData.append('event_date', this.state.EventDate);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState(
                        {
                            registered: true
                        }
                    )
                    return response.json()
                } else if (response.status === 406) {
                    this.setState({ error: "The event details you have entered cannot be used!" })
                } else if (response.status === 403) {
                    this.setState({ error: "Sorry, an event with this name already exists!" })
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }


    /**
    * [Function Name]
    * 
    * [Function Description]
    *
    * @param [type] $[var]   [Description]
    */
    render() {
        let page;
        let errorMessage = this.state.error

        if (this.state.admin) {
            if (this.state.EventsForm) {
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Add an event!
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Enter the event's details down below!
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <AdminButtons 
                                    handleAddMatchesClick={this.handleAddMatchesClick}
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleManageTeamsClick={this.handleManageTeamsClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={10}>
                                <FormWeeklyEvents
                                handleEventTitle={this.handleEventTitle}
                                handleEventDesc={this.handleEventDesc}
                                handleEventImage={this.handleEventImage}
                                handleEventDate={this.handleEventDate}
                                handleEventSubmit={this.handleEventSubmit} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.ManageTeamsForm) {
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Manage Teams
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please use the table below to manage teams forms.
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <AdminButtons
                                    handleAddMatchesClick={this.handleAddMatchesClick}
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleManageTeamsClick={this.handleManageTeamsClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={10}>
                                <FormManageTeams />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.AccoladesForm) {
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Add an Accolade
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please select the team below and the accolades you wish to add!
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <AdminButtons
                                    handleAddMatchesClick={this.handleAddMatchesClick}
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleManageTeamsClick={this.handleManageTeamsClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={10}>
                                <FormTeamAccolades
                                    handleTeamAccoladeSelect={this.handleTeamAccoladeSelect}
                                    handleTeamSelect={this.handleTeamSelect} />
                                    handleAccoladeSubmit={this.handleAccoladeSubmit}
                                    <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else {
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Administrative Options
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please select an option from the list on the left!
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <AdminButtons
                                    handleAddMatchesClick={this.handleAddMatchesClick}
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleManageTeamsClick={this.handleManageTeamsClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }
        }
        else {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Unauthorised access!
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Unfortunately, you do not have the required level of access to enter this page!
                                <br></br>Please leave this page and return to the rest of the site.
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        //Sets the state for the Add Match Form page upon button press.

        return (
            <div>{page}</div>
        )
    }
}
export default AdminPage;
