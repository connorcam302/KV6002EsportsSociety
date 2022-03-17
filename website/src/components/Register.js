import React from "react";

class Register extends React.Component{
    render(){
        return(
            <div>
                <input
                    type='text'
                    placeholder='First Name'
                    value={this.props.firstname}
                    onChange={this.props.handlefirstName}
                />
                <input
                    type='text'
                    placeholder='Last Name'
                    value={this.props.lastname}
                    onChange={this.props.handlelastName}
                />
                <input
                    type='text'
                    placeholder='User IGN'
                    value={this.props.userIGN}
                    onChange={this.props.handleUserIGN}
                />
                 <input
                    type='text'
                    placeholder='Email Address'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                />
                <button onClick={this.props.handleRegisterClick}>Register Account</button>
            </div>
        )
    }
}

export default Register;