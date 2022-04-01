import React from "react";
import Login from "./Login.js";
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
            authenticated: false,
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
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleManageTeamsClick = this.handleManageTeamsClick.bind(this);
        this.handleAddMatchesClick = this.handleAddMatchesClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            this.setState({
                authenticated: true,
                token: localStorage.getItem('UserLoginToken')
            })
            if (decodedToken.user_isAdmin = 1) {
                this.setState({
                    admin: true,
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

    handleLoginClick = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/adminlogin"

        let formData = new FormData();
        formData.append('user_email', this.state.email);
        formData.append('user_password', this.state.password);

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                if ("token" in data.results) {
                    this.setState(
                        {
                            admin: true,
                            token: data.results.token
                        }
                    )

                    localStorage.setItem('AdminToken', data.results.token);
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    handleLogoutClick = () => {
        this.setState(
            {
                admin: false,
                token: null
            }
        )
        localStorage.removeItem('AdminToken');
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
        let page = (
            <Box container spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                            Administration login
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Login
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleLoginClick={this.handleLoginClick}
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
                
            </Box>

        )



        if (this.state.admin) {
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
        if (this.state.MatchesForm && this.state.admin) {
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

        if (this.state.EventsForm && this.state.admin) {
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

        if (this.state.ManageTeamsPage && this.state.admin) {
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

        if (this.state.authenticated) {
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