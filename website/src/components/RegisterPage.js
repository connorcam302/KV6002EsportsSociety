import React from "react";
import Register from "./Register";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userign: "",
            userFirst: "",
            userLast: "",
        }
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handleUserIGN = this.handleUserIGN.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    componentDidMount() {

    }

    handlefirstName = (e) => {
        this.setState({ userFirst: e.target.value }) //Change these in the future.
    }

    handlelastName = (e) => {
        this.setState({ userLast: e.target.value }) //Change these in the future.
    }

    handleUserIGN = (e) => {
        this.setState({ userign: e.target.value }) //Change these in the future.
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
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
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
    }

    render() {
        let page = (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Register your account</h1>
                        <h2>Please enter your details below to register your account!</h2>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Register
                            handlefirstName={this.handlefirstName}
                            handlelastName={this.handlelastName}
                            handleUserIGN={this.handleUserIGN}
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleRegisterClick={this.handleRegisterClick}
                        />
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </Box>
        )
        return (
            <div>{page}</div>
        )
    }


}

export default RegisterPage;