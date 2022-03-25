import * as React from "react";

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
                <ul><button onClick={this.props.handleLoginClick}>Log in</button></ul>
            </div>
        );
    }
}

export default Login;