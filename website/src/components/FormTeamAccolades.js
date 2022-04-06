import * as React from "react";
import Button from '@mui/material/Button';
import AdminPage from "./AdminPage";


/**
* FormTeamAccolades
* 
* This class is used to display the Form needed to update the accolades associated with teams currently available on the service.
* The drop down lists use data collected from the API to display an updated list of Accolades available and all available teams at that moment, with any new teams being automatically updated.
*
* @author Ethan Borrill W18001798
* 
* 
*/

class FormTeamAccolades extends React.Component {
   
   
    componentDidMount() {
        let url1 = "http://unn-w18003255.newnumyspace.co.uk/KV6002/Assessment/api/accolades"
        this.fetchData1(url1)
        
        let url2 = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team"
        this.fetchData2(url2)
        }


    constructor(props) {
        super(props);
        this.state = {
            results :[],
            accolades: [],
            teams: [],
        }
    }
    
    fetchData1 = (url1) => {
        url1 
    fetch(url1)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then((data) => {
            this.setState({ accolades: data.results })
        })
        .catch((err) => {
            console.log("something has gone wrong ", err)
        });
    }
    
    fetchData2 = (url2) => {
        url2
    fetch(url2)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then((data) => {
            this.setState({ teams: data.results })
        })
        .catch((err) => {
            console.log("something has gone wrong ", err)
        });
    }
    
    render(){
        return (
            <div>
            <ul>
            <label>
                <select value={this.props.accolade_id} onChange={this.props.handleTeamAccoladeSelect}>
                <option value="">Select an Accolade here</option>        
                {this.state.accolades.map( (accolade) => <option value={accolade.accolade_id}>{accolade.accolade_name}</option>)}
                </select>
            </label>
            </ul>
            <ul>
            <label>
                <select value={this.props.team_id} onChange={this.props.handleTeamSelect}>
                <option value="">Select a team here</option>
                {this.state.teams.map( (team) => <option value={team.team_id}>{team.team_name}</option>)}
                </select>
            </label>
            </ul>

                <ul><Button onClick={this.props.handleAccoladeSubmit}>Submit Accolade</Button></ul>
            </div>
        );
    }
}


export default FormTeamAccolades;