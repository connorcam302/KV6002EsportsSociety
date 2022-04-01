import * as React from "react";
import Button from '@mui/material/Button';

class Login extends React.Component {

    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Email here'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                /></ul>
                <ul><input
                    type='password'
                    placeholder='Password here'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                /></ul>
                <ul><Button onClick={this.props.handleLoginClick}>Log in</Button></ul>
                <ul><Button onClick={this.props.handleRegisterState}>Don't have an account, register one here!</Button></ul>
            </div>
        );
    }
}

export default Login;