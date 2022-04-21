import * as React from "react";
import Button from '@mui/material/Button';
import SelectMenu from "./SelectMenu";

/**
* ResultsForm
* 
* This class is used to create the form necessary to create and upload new sets of match
history for the website
*
* @author Jacob Clark w18003237
*/

class AdminResultsForm extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <SelectMenu/>
                </ul>

                <ul><input
                    type='text'
                    placeholder='Opponent'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchOpponent}
                /></ul>

                <ul><input
                    type='date'
                    placeholder='Date of the games played'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchDate}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Results total for each team'
                    value={this.props.eventDesc}
                    onChange={this.props.handleMatchResults}
                /></ul>

                <ul><Button onClick={this.props.handleEventSubmit}>Submit Results</Button></ul>
            </div>
        );
    }
}

export default AdminResultsForm;