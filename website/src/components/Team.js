/**
 * Team Class
 *
 * @author Harry Laws w19024957
 */

import React from "react";
import Teams from "./Teams.js"

class Team extends React.Component {

    constructor(props) {
        super(props)
            this.state = { display: false }
        }

        render(){
            return (

                    <section class="post">
                            <div class="content">
                                    <h2>{this.props.team.team_name}</h2>
                                    <left>
                                    <h3>Game Played: {this.props.team.game_name}</h3>
                                    <h3>Team Leader: {this.props.team.user_firstName} {this.props.team.user_lastName}</h3>
                                    <p>Last Result</p>
                                    </left>
                                    <table>
                                        <tr>
                                            <th>Oppnent</th>
                                            <th>Date</th>
                                            <th>Result</th>
                                         </tr>
                                        <tr>
                                            <td>{this.props.team.match_opponent}</td>
                                            <td>{this.props.team.match_date}</td>
                                            <td>{this.props.team.match_outcome}</td>
                                        </tr>
                                    </table>
										<input type="submit" value="Apply for the Team" class="special" />
                            </div>
                    </section>                             
            );
        }
    }
                                        
                                        
                                               
    
         
        
    
      

export default Team;
 
 
 