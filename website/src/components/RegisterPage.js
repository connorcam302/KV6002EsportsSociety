import React from "react";
import Register from "./Register";

class RegisterPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            token: null,
            email: "",
            password: ""
        }
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handleUserIGN = this.handleUserIGN.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('LoginToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('LoginToken')
            });
        }
    }

    handlefirstName = (e) => {
        this.setState({ firstName: e.target.value}) //Change these in the future.
    }

    handlelastName = (e) => {
        this.setState({ lastName: e.target.value}) //Change these in the future.
    }

    handleUserIGN = (e) => {
        this.setState({ userIGN: e.target.value}) //Change these in the future.
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value})
    }

    handleRegisterClick = () => {
        
    }



    render(){
        let  page = ( 
            <div>
                <h1>Register your account</h1>
                <h2>Please enter your details below to register your account!</h2>
                <Register
                handlefirstName={this.handlefirstName}
                handlelastName={this.handlelastName}
                handleUserIGN={this.handleUserIGN}
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handleRegisterClick={this.handleRegisterClick}
                />
            </div>
        )
        return (
            <div>{page}</div>
        )
    }
}

export default RegisterPage;