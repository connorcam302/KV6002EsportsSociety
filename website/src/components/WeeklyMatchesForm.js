import React from "react";

class WeeklyMatchesForm extends React.Component {
    render() {
        return (
            <div>
                <h1>Add weekyl matches.</h1>
                <button onClick={this.props.handleAddMatchesClick}>Submit team</button>
            </div>
        );
    }
}

export default WeeklyMatchesForm;