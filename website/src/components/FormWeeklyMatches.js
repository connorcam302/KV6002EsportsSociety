import * as React from "react";
import Button from '@mui/material/Button';

/**
* FormWeeklyMatches
* 
* This class is used to create the form necessary to create match histories necessary to be displayed on the 'Match results' page of the website.
*
* @author Ethan Borrill W18001798
*/

class FormWeeklyMatches extends React.Component {
    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Week of match'
                    value={this.props.gameWeek}
                    onChange={this.props.handleGameWeek}
                /></ul>

                 <ul><input
                    type='text'
                    placeholder='Game title'
                    value={this.props.gameTitle}
                    onChange={this.props.handleGameTitle}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Team who played in match'
                    value={this.props.gameTeam}
                    onChange={this.props.handleGameTeam}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Match score'
                    value={this.props.gameScore}
                    onChange={this.props.handleGameScore}
                /></ul>
                <ul><Button onClick={this.props.handleAddMatchesClick}>Submit match information</Button></ul>
            </div>
        );
    }
}

export default FormWeeklyMatches;