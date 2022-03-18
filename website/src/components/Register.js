import React from "react";

class Register extends React.Component{
    render(){
        return(
            <div>
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
                <input
                    type='text'
                    placeholder='User IGN'
                    value={this.props.userign}
                    onChange={this.props.handleUserIGN}
                />
                <input
                    type='text'
                    placeholder='First Name'
                    value={this.props.userFirst}
                    onChange={this.props.handlefirstName}
                />
                <input
                    type='text'
                    placeholder='Last Name'
                    value={this.props.userLast}
                    onChange={this.props.handlelastName}
                />
                <button onClick={this.props.handleRegisterClick}>Register Account</button>
            </div>
        )
    }
}

export default Register;