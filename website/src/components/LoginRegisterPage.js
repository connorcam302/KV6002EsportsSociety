import React from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import jwt_decode from "jwt-decode";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";

/**
* LoginRegisterPage
* 
* The Class manages the functionality and content displayed on the Login and Register page of the website. The page provides users with both a login and register form, both of which are accesible through the links are the bottom of each form - 
* which simply switches the state of the page to display the other form.
*
* @author Ethan Borrill W18001798
*/

class LoginRegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: false,
            admin: false,
            registered: false,
            registerpage: false,
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
        this.handleRegisterState = this.handleRegisterState.bind(this);
        this.handleLoginState = this.handleLoginState.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            this.setState({
                user: true,
                token: localStorage.getItem('myReadingListToken')
            })
            if (decodedToken.user_isAdmin = 1) {
                this.setState({
                    admin: true,
                });
            }
        }
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
    * handlePassword(e)
    * 
    * Handles the input and change of text within the password field used within the register and login pages.
    *
    */

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }


    /**
    * handlefirstName(e)
    * 
    * Handles the input and change of text within the 'First Name' field used within the register page.
    *
    */

    handlefirstName = (e) => {
        this.setState({ userFirst: e.target.value })
    }


    /**
    * handlelastName(e)
    * 
    * Handles the input and change of text within the 'Last Name' field used within the register page.
    *
    */

    handlelastName = (e) => {
        this.setState({ userLast: e.target.value })
    }


    /**
    * handleUserIGN(e)
    * 
    * Handles the input and change of text within the 'User IGN' field used within the register page.
    *
    */

    handleUserIGN = (e) => {
        this.setState({ userign: e.target.value })
    }

    /**
    * handleRegisterState()
    * 
    * Changes the state of the webpage to display the register form when the user presses the register button on the Login page.
    *
    */

    handleRegisterState = () => {
        this.setState(
            {
                loginpage: false,
                registerpage: true
            }
        )
    }


    /**
    * handleLoginState()
    * 
    * Changes the state of the webpage to display the login form when the user presses the login button on the Register page.
    *
    */

    handleLoginState = () => {
        this.setState(
            {
                loginpage: true,
                registerpage: false
            }
        )
    }


    /**
    * handleLoginClick()
    * 
    * This functionality is used when the user presses the 'Login' button on the login page, this will first check the form data entered into it
    * - which should the details be correct, the 'user' boolean is updated to true and a token is created to keep the user logged into the website should they leave.
    *
    * In the event the details entered are incorrect, this will be flagged within an error message and prevent the user from logging in.
    * @param [type] $[var]   [Description]
    */

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
                if (response.status === 200) { //If the status code of the webpage is 200, perform the login function from the API.
                    return response.json()
                } else if (response.status === 401) { //If the status code of the webpage is 401, display an error saying the details collected are incorrect.
                    this.setState({ error: "The email address or password you have entered are not correct, please try again!" })
                }
            })

            .then((data) => { //Using the data collected from a successful login, store the data in a Java Web Token to be used on the webpage and set the boolean 'user' to true.
                if ("token" in data.results) {
                    this.setState(
                        {
                            user: true,
                            token: data.results.token
                        }
                    )

                    localStorage.setItem('UserLoginToken', data.results.token); //Store the Token within the Browser's local storage.
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }


    /**
    * handleRegisterClick
    * 
    * This functionality handles when a user presses the Register button on the Register page. Includes error catches for if form inputs are empty.
    * Will only submit data to the database if all fields are filled and provide the correct data. Upon complete submission, the boolean 'Registered' is updated to be true.
    * This is used to move users to the secondary login page for users to login immediately after registering.
    *
    */

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
                    this.setState({ error: "The email address or password you have entered is not acceptable." })
                }
                else if (response.status === 403) {
                    this.setState({ error: "The email address you have entered already exists, please try another email address." })
                }
                if (this.state.email == ' ') {
                    this.setState({ error: "." })
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
     * 
     * @returns {Page} - Will display the rendered page content based on the conditions required.
     */

    render() {
        let errorMessage = this.state.error

        /**
         * Default page presented upon accessing the page, will display standard login page.
         * Is also accessed should a user press the 'Already have an account? Log in here!' link on the register page.
         */
        let page = (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                            Login
                        </Typography>
                        <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                            Please enter your details to log into your account!
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <FormLogin
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleLoginClick={this.handleLoginClick}
                            handleRegisterState={this.handleRegisterState}
                        />
                        <ul><p className="errorMessage">{errorMessage}</p></ul>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )


        /**
         * The content required for the Register page, will be displayed if user presses the 'Don't have an account? register one here!' link on the Login page.
         */
        if (this.state.registerpage) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Register
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Please enter your details below to register your account!
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                            <FormRegister
                                handlefirstName={this.handlefirstName}
                                handlelastName={this.handlelastName}
                                handleUserIGN={this.handleUserIGN}
                                handleEmail={this.handleEmail}
                                handlePassword={this.handlePassword}
                                handleRegisterClick={this.handleRegisterClick}
                                handleLoginState={this.handleLoginState}
                            />
                            <ul><p className="errorMessage">{errorMessage}</p></ul>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        /**
         * Secondary login page content, displayed only when a user performs a successfuly account registration.
         */
        if (this.state.registered) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Your details have been successfully registered!
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Please enter your details below to log into your account!
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                            <FormLogin
                                handleEmail={this.handleEmail}
                                handlePassword={this.handlePassword}
                                handleLoginClick={this.handleLoginClick}
                            />
                            <ul><p className="errorMessage">{errorMessage}</p></ul>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        /**
         * Content to be displayed if a user has successfully logged into their account.
         */
        if (this.state.user && this.state.admin) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Login successful!
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                You have been successfully logged! Please enjoy the site!
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        </Grid>
                        <Grid item xs={4}>
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