/**
 * Team Class
 *
 * @author Harry Laws w19024957
 * 
 * 
 */

import React from "react";
import TeamPage from "./TeamPage.js"

class Team extends React.Component {

    constructor(props) {
        super(props)
            this.state = { display: false }
        }

        render(){
            return (
                    <section class="post">
                            <div class="content">
                                    <TeamPage teamid={this.props.team.team_id}/> 
                            </div>
                    </section>                             
            );
        }
    }

export default Team;
 
 
 