import React from "react";

class FormManageTeamsApplicationDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: true
        }
    }

    render() {
        let details = "";

        if (this.state.display) {
            
            details = <div>
                        <p>{this.props.pendingTeams.game_name}</p>
                        <p>{this.props.pendingTeams.team_lead}</p>
                      </div>
        }    

        return(
            <div>
                <p>{this.props.pendingTeams.team_name}</p>
                {details}
            </div>
        )
    }
}

export default FormManageTeamsApplicationDetails;