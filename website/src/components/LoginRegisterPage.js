import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import AdminButtons from "./AdminButtons.js";
import jwt_decode from "jwt-decode";
import WeeklyEventsForm from "./WeeklyEventsForm.js";
import ManageTeamsForm from "./ManageTeamsForm.js";
import WeeklyMatchesForm from "./WeeklyMatchesForm.js";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

class LoginRegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: false,
            admin:false,
            registered:false,
            registerpage:false,
            token: null,
            email: "",
            password: "",
            userign: "",
            userFirst: "",
            userLast: "",
            error: "",
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handleUserIGN = this.handleUserIGN.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleRegisterState = this.handleRegisterState.bind(this);
        this.handleLoginState = this.handleLoginState.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleManageTeamsClick = this.handleManageTeamsClick.bind(this);
        this.handleAddMatchesClick = this.handleAddMatchesClick.bind(this);
    }


    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
           this.setState({
            user:true,
            token: localStorage.getItem('myReadingListToken')
           })
            if(decodedToken.user_isAdmin = 1) {
                this.setState({
                admin: true,
                });
            }
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handlefirstName = (e) => {
        this.setState({ userFirst: e.target.value })
    }

    handlelastName = (e) => {
        this.setState({ userLast: e.target.value })
    }

    handleUserIGN = (e) => {
        this.setState({ userign: e.target.value })
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

    handleLogoutClick = () => {
        this.setState(
            {
                user: false,
                admin:false,
                token: null
            }
        )
        localStorage.removeItem('UserLoginToken');
    }

    handleRegisterState = () => {
        this.setState(
            {
                loginpage:false,
                registerpage:true
            }
        )
    }

    handleLoginState = () => {
        this.setState(
            {
                loginpage:true,
                registerpage:false
            }
        )
    }

    handleLoginClick = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/userlogin"

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
                } else if (response.status === 401 ){
                    this.setState({error: "The email address or password you have entered are not correct, please try again!"})
                } 
            })

            .then((data) => {
                if ("token" in data.results) {
                    this.setState(
                        {
                            user: true,
                            token: data.results.token
                        }
                    )

                    localStorage.setItem('UserLoginToken', data.results.token);
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    handleRegisterClick = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/register"

        let formData = new FormData();
        formData.append('user_email', this.state.email);
        formData.append('user_password', this.state.password);
        formData.append('user_ign', this.state.userign);
        formData.append('user_firstName', this.state.userFirst);
        formData.append('user_lastName', this.state.userLast);
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
                    this.setState({error: "The email address or password you have entered is not acceptable."})
                }
                else if (response.status === 403) {
                    this.setState({error: "The email address you have entered already exists, please try another email address."})
                }
                else if (this.state.handleEmail === undefined) {
                    this.setState({error: "."})
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    render() {
        let errorMessage = this.state.error
        
        let page = (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Login</h1>
                        <h2>Please enter your details to log into your account.</h2>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <Login
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleLoginClick={this.handleLoginClick}
                            handleRegisterState={this.handleRegisterState}
                        />
                        <ul><p className = "errorMessage">{errorMessage}</p></ul>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )
        
            

        if(this.state.registerpage){
            page = (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Register your account</h1>
                        <h2>Please enter your details below to register your account!</h2>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}  sx={{ justifyContent: 'center' }}>
                        <Register
                            handlefirstName={this.handlefirstName}
                            handlelastName={this.handlelastName}
                            handleUserIGN={this.handleUserIGN}
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleRegisterClick={this.handleRegisterClick}
                            handleLoginState={this.handleLoginState}
                        />
                        <ul><p className = "errorMessage">{errorMessage}</p></ul>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
            )
        }

        if (this.state.registered){
            page = (
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Your details have successfully be registered!</h1>
                        <h2>Please enter your details below to log into your account!</h2>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <Login
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleLoginClick={this.handleLoginClick}
                        />
                        <ul><p className = "errorMessage">{errorMessage}</p></ul>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
            )
        }

        if (this.state.user && this.state.admin) {
            page = (
                <div>
                    <h1>You're logged in, let's get gaming!</h1>
                    <Logout handleLogoutClick={this.handleLogoutClick} />
                </div>
            )
        }

        if (this.state.user && this.state.admin) {
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
        if (this.state.MatchesForm && this.state.admin && this.state.user) {
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

        if (this.state.EventsForm && this.state.admin && this.state.user) {
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

        if (this.state.ManageTeamsPage && this.state.admin && this.state.user) {
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

        
        return (
            <div>{page}</div>
        )
    }


}

export default LoginRegisterPage;