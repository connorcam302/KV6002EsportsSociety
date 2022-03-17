import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='Email here'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                />
                <input
                    type='password'
                    placeholder='Password here'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                />
                <button onClick={this.props.handleLoginClick}>Log in</button>
            </div>
        );
    }
}

export default Login;