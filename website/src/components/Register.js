import React from "react";

class Register extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <input
                        type='text'
                        placeholder='Email Address'
                        value={this.props.email}
                        onChange={this.props.handleEmail}
                    /></ul>
                <ul><input
                    type='password'
                    placeholder='Password'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                /></ul>
                <ul><input
                    type='text'
                    placeholder='User IGN'
                    value={this.props.userign}
                    onChange={this.props.handleUserIGN}
                /></ul>
                <ul><input
                    type='text'
                    placeholder='First Name'
                    value={this.props.userFirst}
                    onChange={this.props.handlefirstName}
                /></ul>
                <ul><input
                    type='text'
                    placeholder='Last Name' C
                    value={this.props.userLast}
                    onChange={this.props.handlelastName}
                /></ul>
                <ul><button onClick={this.props.handleRegisterClick}>Register Account</button></ul>
            </div>
        )
    }
}

export default Register;