import React from "react";

class WeeklyMatchesForm extends React.Component {
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

                <ul><button onClick={this.props.handleAddMatchesClick}>Submit match information</button></ul>
            </div>
        );
    }
}

export default WeeklyMatchesForm;