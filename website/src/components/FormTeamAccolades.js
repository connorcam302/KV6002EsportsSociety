import * as React from "react";
import Button from '@mui/material/Button';


/**
* FormTeamAccolades
* 
* This class is used to display the Form needed to update the accolades associated with teams currently available on the service.
*
* @author Ethan Borrill W18001798
* 
* 
*/

class FormTeamAccolades extends React.Component {
    render(){
        return (
            <div>
            <ul>
            <label>
                <select value={this.props.accolade_id} onChange={this.props.handleTeamAccoladeSelect}>
                    <option value="">Select accolades here</option>
                    <option value="1">Division 3 Qualifier</option>
                    <option value="2">Division 3 3rd Place</option>
                    <option value="3">Division 1</option>
                    <option value="4">Division 1 Top 8</option>
                </select>
            </label>
            </ul>
            <ul>
            <label>
                <select value={this.props.team_id} onChange={this.props.handleTeamSelect}>
                    <option value="">Select a team here</option>
                    <option value="1">Vikings Dota</option>
                    <option value="2">Vikings LoL NSE</option>
                    <option value="3">Vikings LoL NUEL</option>
                    <option value="4">Valhalla</option>
                    <option value="5">Northumbria Noodles</option>
                    <option value="6">Northumbria Nighthawks</option>
                    <option value="7">Vikings RL</option>
                    <option value="8">Bongos NSE</option>
                    <option value="9">Bongos NUEL</option>
                </select>
            </label>
            </ul>

                <ul><Button onClick={this.props.handleAccoladeSubmit}>Submit Accolade</Button></ul>
            </div>
        );
    }
}

export default FormTeamAccolades;