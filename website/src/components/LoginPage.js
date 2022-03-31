import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import RegisterLink from "./RegisterLink";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";



class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            token: null,
            email: "",
            password: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('UserLoginToken')
            });
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleLogoutClick = () => {
        this.setState(
            {
                authenticated: false,
                token: null
            }
        )
        localStorage.removeItem('UserLoginToken');
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
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                if ("token" in data.results) {
                    this.setState(
                        {
                            authenticated: true,
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

    render() {
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
                        />
                        <RegisterLink />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )
        if (this.state.authenticated) {
            page = (
                <div>
                    <h1>You're logged in, let's get gaming!</h1>
                    <Logout handleLogoutClick={this.handleLogoutClick} />
                </div>
            )
        }
        return (
            <div>{page}</div>
        )
    }


}

export default LoginPage;