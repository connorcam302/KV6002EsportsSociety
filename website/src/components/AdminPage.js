import React from "react";
import Login from "./Login.js";
import Logout from "./Logout.js";
import AdminButtons from "./AdminButtons.js";
import WeeklyEventsForm from "./WeeklyEventsForm.js";
import ManageTeamsForm from "./ManageTeamsForm.js";
import WeeklyMatchesForm from "./WeeklyMatchesForm.js";


class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            admin: false,
            token: null,
            EventsForm:false,
            ManageTeamsPage:false,
            MatchesForm:false,
            email: "",
            password: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleManageTeamsClick = this.handleManageTeamsClick.bind(this);
        this.handleAddMatchesClick = this.handleAddMatchesClick.bind(this);
}

componentDidMount() {
    if (localStorage.getItem('AdminToken')) {
        this.setState({
            admin:true,
            token: localStorage.getItem('AdminToken')
        });
    }

    if (localStorage.getItem('UserLoginToken')) {
        this.setState({
            authenticated:true,
            token: localStorage.getItem('UserLoginToken')
        });
    }
}

handlePassword = (e) => {
    this.setState({ password: e.target.value })
}

/**
 * Manages the email address input into the login form, which is then used within the authentication process.
 * @param text e - stores the entered email address.
 */
handleEmail = (e) => {
    this.setState({ email: e.target.value })
}

handleLoginClick = () => {
    let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/adminlogin"

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
                        admin:true,
                        token: data.results.token
                    }
                )

                localStorage.setItem('AdminToken', data.results.token);
            }
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        }
        );
}

handleLogoutClick = () => {
    this.setState(
        {
            admin: false,
            token: null
        }
    )
    localStorage.removeItem('AdminToken');
}

handleAddMatchesClick = () => {
    this.setState(
        {
            MatchesForm: true,
            ManageTeamsPage: false,
            EventsForm: false,
        }
    )
}

handleEventsFormClick = () => {
    this.setState(
        {
            EventsForm: true,
            MatchesForm: false,
            ManageTeamsPage: false
        }
    )
}

handleManageTeamsClick = () => {
    this.setState(
        {
            ManageTeamsPage: true,
            EventsForm: false,
            MatchesForm: false,
        }
    )
}

render() {
    let page = (
        <div>
            <h1>Administrative Login</h1>
            <Login
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handleLoginClick={this.handleLoginClick}
            />
        </div>
    )
    if (this.state.admin) {
        page = (
            <div>
                <h1>The Reading List</h1>
                <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick} handleEventsFormClick={this.handleEventsFormClick} handleManageTeamsClick={this.handleManageTeamsClick}/>
                <Logout handleLogoutClick={this.handleLogoutClick} />
            </div>
        )
    }

    //Sets the state for the Add Match Form page upon button press.
    if (this.state.MatchesForm && this.state.admin){
        page = (
            <div>
                <h1>Add Matches </h1>
                <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick} handleEventsFormClick={this.handleEventsFormClick} handleManageTeamsClick={this.handleManageTeamsClick}/>
                <WeeklyMatchesForm/>
                <Logout handleLogoutClick={this.handleLogoutClick} />
            </div>
        )
    }

    if (this.state.EventsForm && this.state.admin){
        page = (
            <div>
                <h1>Add an event! </h1>
                <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick} handleEventsFormClick={this.handleEventsFormClick} handleManageTeamsClick={this.handleManageTeamsClick}/>
                <WeeklyEventsForm/>
                <Logout handleLogoutClick={this.handleLogoutClick} />
            </div>
        )
    }

    if (this.state.ManageTeamsPage && this.state.admin){
        page = (
            <div>
                <h1>Manage teams </h1>
                <AdminButtons handleAddMatchesClick={this.handleAddMatchesClick} handleEventsFormClick={this.handleEventsFormClick} handleManageTeamsClick={this.handleManageTeamsClick}/>
                <ManageTeamsForm/>
                <Logout handleLogoutClick={this.handleLogoutClick} />
            </div>
        )
    }

    if (this.state.authenticated) {
        page = (
            <div>
                <h1>You arent supposed to be here!</h1>
                <Logout handleLogoutClick={this.handleLogoutClick} />
            </div>
        )
    }

    return (
        <div>{page}</div>
    )
}
}
export default AdminPage;