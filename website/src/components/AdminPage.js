import React from "react";
import AdminButtons from "./AdminButtons.js";
import jwt_decode from "jwt-decode";
import FormWeeklyEvents from "./FormWeeklyEvents.js";
import FormManageTeams from "./FormManageTeam.js";
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


    /**
    * Constructor
    * 
    * This function initialises several critical components needed for this file to run.
    *
    */

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

            TeamDropDown: "",
            AccoladesDropDown: "",
            TeamApplicationsDropDown: "",
        }
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

        this.handleTeamSubmissionsSelect = this.handleTeamSubmissionsSelect.bind(this);
        this.handleTeamsFormApprove = this.handleTeamsFormApprove.bind(this);
        this.handleTeamsFormDecline = this.handleTeamsFormDecline.bind(this);
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
    //FUNCTIONALITY FOR THE WEEKLY EVENTS FORM.
    /**
    * handleEventsFormClick
    * 
    * This is used on the Events form button, will set the state needed for the Events form to be displayed to be true.
    *
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

    /**
    * handleEventTitle(e)
    * 
    * Handles the input and change of text within the 'Event Title' field used within the Events form page.
    *
    */
    handleEventTitle = (e) => {
        this.setState({ EventTitle: e.target.value })
    }

    /**
    * handleEventDesc(e)
    * 
    * Handles the input and change of text within the 'Event Description' field used within the Events form page.
    *
    */
    handleEventDesc = (e) => {
        this.setState({ EventDesc: e.target.value })
    }

    /**
    * handleEventTitle(e)
    * 
    * Handles the input and change of text within the 'Event Image' field used within the Events form page.
    *
    */
    handleEventImage = (e) => {
        this.setState({ EventImage: e.target.value })
    }

    /**
    * handleEventDate(e)
    * 
    * Handles the input and change of text within the 'Event Date' field used within the Events form page.
    *
    */
    handleEventDate = (e) => {
        this.setState({ EventDate: e.target.value })
    }


    /**
    * handleEventSubmit
    * 
    * This function is used on the Submission button present on the Events form page. 
    * Upon pressing the button, The contents entered within each field is checked to not be empty - if not the details are submitted to the Events table in the database.
    *
    */
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
                if (response.status === 200) {
                    this.setState({ error: "Event has been successfully created and uploaded!" })
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

    //FUNCTIONALITY FOR THE TEAM MANAGEMENT PAGE.
    /**
    * handleManageTeamsClick
    * 
    * This is used on the ManageTeams form button, will set the state needed for the Team management form to be displayed to be true.
    *
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
    * handleTeamSubmissionsSelect
    * 
    * This function handles the updating of the dropdown box used on the 'Teams Application' page, which is essential for navigating applications via updating the ID used in the dropdown box to identify each item.
    *
    */
    handleTeamSubmissionsSelect = (e) => {
        this.setState({ TeamApplicationsDropDown: e.target.value })
    }

    /**
    * handleTeamsFormApprove
    * 
    * This function handles the Approval of a team application from the pendingTeams list, this is assigned to the 'Approve application' button on the Team Applications.
    * The form is managed using the dropdown box, which displays the name of the Team in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleTeamsFormApprove = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/pendingteamsapprove"

        let formData = new FormData();
        formData.append('team_id', this.state.TeamApplicationsDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.TeamApplicationsDropDown === "")){
                    this.setState({ error: "Please select an application before approving!" })
                }
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This team submission has been approved!" })
                    return response.json()
                } 
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
    * handleTeamsFormDecline
    * 
    * This function handles the deletion of a team application from the pendingTeams list, this is assigned to the Decline application button on the Team Applications.
    * The form is managed using the dropdown box, which displays the name of the Team in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleTeamsFormDecline = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/pendingteamsremove"

        let formData = new FormData();
        formData.append('team_id', this.state.TeamApplicationsDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (this.state.TeamApplicationsDropDown === ""){
                    this.setState({ error: "Please select an application before attempting to delete!" })
                } else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This team application has been successfully deleted!" })
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    //FUNCTIONALITY FOR THE ACCOLADES PAGE.
    /**
    * handleTeamAccoladesClick
    * 
    * This is used on the Accolades form button, will set the state needed for the Accolades form to be displayed to be true.
    *
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
    * handleTeamSelect
    * 
    * This function handles updating the option selected within the Teams dropdown used by the Accolades form, this is done so that the correct ID is collected and sent during submission.
    *
    */
    handleTeamSelect = (e) => {
        this.setState({ TeamDropDown: e.target.value })
    }

    /**
    * handleTeamAccolade Select
    * 
    * This function handles updating the option selected within the Accolades dropdown used by the Accolades form, this is done so that the correct ID is collected and sent during submission.
    *
    */
    handleTeamAccoladeSelect = (e) => {
        this.setState({ AccoladesDropDown: e.target.value })
    }

    /**
    * handleAccoladeSubmit
    * 
    * This function is used with the Submission button shown on the accolade page, upon pressing this button a check is performed. This check determines if the dropdowns used have an option selected within them,
    * If a team has been selected and the accolade ID have been selected - the ID of these 2 components are inserted into the teamAccolades table within the database.
    */
    handleAccoladeSubmit = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/accoladesform"

        let formData = new FormData();
        formData.append('userTeam_id', this.state.TeamDropDown);
        formData.append('accolade_id', this.state.AccoladesDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.TeamDropDown === "") && (this.state.AccoladesDropDown === "")){
                    this.setState({ error: "Please provide both an Team and Accolade before submitting." })
                }
                else if (this.state.TeamDropDown === ""){
                    this.setState({ error: "Please enter a team to provide this accolade to!" })
                }
                else if (this.state.AccoladesDropDown === ""){
                    this.setState({ error: "Please enter an accolade for this team!" })
                }
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "Accolade has been successfully Assigned!" })
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
    * render
    * 
    * This function will create and display the required functionalities for the Adminpage to operate as intended, this consists of several states created by clicking the buttons presented to the left of the page.
    * Upon pressing these buttons the relevant forms and inputs will be displayed to update certain data displayed on the webpage.
    *
    * @returns {Page} - Will display the rendered page content based on the conditions required.
    */
    render() {
        let page;
        let errorMessage = this.state.error

        if (this.state.admin) {
            if (this.state.EventsForm) { //EVENTS FORM STATE
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
            } else if (this.state.ManageTeamsForm) { //MANAGE TEAM FORM STATE
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Team Applications
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please use the dropdown box to approve or delete applications.
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
                                <FormManageTeams
                                    handleTeamSubmissionsSelect={this.handleTeamSubmissionsSelect}
                                    handleTeamsFormApprove={this.handleTeamsFormApprove}
                                    handleTeamsFormDecline={this.handleTeamsFormDecline} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.AccoladesForm) { //ACCOLADES FORM STATE
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
                                    handleTeamSelect={this.handleTeamSelect}
                                    handleAccoladeSubmit={this.handleAccoladeSubmit} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else { //LANDING PAGE STATE.
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
        } else { //Unauthorised ACCESS STATE
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

        return (
            <div>{page}</div>
        )
    }
}
export default AdminPage;
