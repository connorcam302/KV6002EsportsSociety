import React from "react";
import Login from "./Login";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
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
        if (localStorage.getItem('LoginToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('LoginToken')
            });
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value})
    }

    handleLogoutClick = () => {
        this.setState(
            {
                authenticated: false,
                token: null
            }
        )
        localStorage.removeItem('LoginToken');
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

    render(){
        let  page = ( 
            <div>
                <h1>Login</h1>
                <h2>Please enter your details to log into your account.</h2>
                <Login
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handleLoginClick={this.handleLoginClick}
                />
            </div>
        )
        return (
            <div>{page}</div>
        )
    }


}

export default LoginPage;