import React from "react";
import AdminButtons from "./AdminButtons.js";
import jwt_decode from "jwt-decode";
import WeeklyEventsForm from "./WeeklyEventsForm.js";
import ManageTeamsForm from "./ManageTeamsForm.js";
import WeeklyMatchesForm from "./WeeklyMatchesForm.js";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';


class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            token: null,
            EventsForm: false,
            ManageTeamsPage: false,
            MatchesForm: false,
            email: "",
            password: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleManageTeamsClick = this.handleManageTeamsClick.bind(this);
        this.handleAddMatchesClick = this.handleAddMatchesClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            this.setState({
                token: localStorage.getItem('UserLoginToken')
            })
            if (decodedToken.user_isAdmin = 1) {
                this.setState({
                    admin: true
                });
            }
        }
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    /**
     * Manages the email address input into the login form, which is then used within the authentication process.
     * @param text e - stores the entered email address.
     */
    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleLogoutClick = () => {
        this.setState(
            {
                admin: false,
                token: null
            }
        )
        localStorage.removeItem('UserLoginToken');
    }

    handleAddMatchesClick = () => {
        this.setState(
            {
                MatchesForm: true,
                ManageTeamsPage: false,
                EventsForm: false,
            }
        )
    }

    handleEventsFormClick = () => {
        this.setState(
            {
                EventsForm: true,
                MatchesForm: false,
                ManageTeamsPage: false
            }
        )
    }

    handleManageTeamsClick = () => {
        this.setState(
            {
                ManageTeamsPage: true,
                EventsForm: false,
                MatchesForm: false,
            }
        )
    }

    render() {
        let page; 

        if (this.state.admin)
        console.log("User is admin.") 
        {
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
                            <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick}
                                handleEventsFormClick={this.handleEventsFormClick}
                                handleManageTeamsClick={this.handleManageTeamsClick}
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


        //Sets the state for the Add Match Form page upon button press.
        if (this.state.MatchesForm) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Add Matches
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Enter the match details down below!
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick}
                                handleEventsFormClick={this.handleEventsFormClick}
                                handleManageTeamsClick={this.handleManageTeamsClick}
                                handleLogoutClick={this.handleLogoutClick} />
                        </Grid>
                        <Grid item xs={10}>
                            <WeeklyMatchesForm />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

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
                            <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick}
                                handleEventsFormClick={this.handleEventsFormClick}
                                handleManageTeamsClick={this.handleManageTeamsClick}
                                handleLogoutClick={this.handleLogoutClick} />
                        </Grid>
                        <Grid item xs={10}>
                            <WeeklyEventsForm />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        if (this.state.ManageTeamsPage) {
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
                            <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick}
                                handleEventsFormClick={this.handleEventsFormClick}
                                handleManageTeamsClick={this.handleManageTeamsClick}
                                handleLogoutClick={this.handleLogoutClick} />
                        </Grid>
                        <Grid item xs={10}>
                            <ManageTeamsForm />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        else {
            console.log("User isnt admin.")
            page = (
                <div>
                    <h1>You arent supposed to be here!</h1>
                    <h2>Please redirect yourself back to any other page on the website.</h2>
                </div>
            )
        }

        return (
            <div>{page}</div>
        )
    }
}
export default AdminPage;