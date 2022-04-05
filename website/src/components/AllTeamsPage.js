
/**
 * Team page
 *
 * @author Harry Laws w19024957
 */

 import React from "react";
 import Teams from "./Teams.js";
 import TeamPage from "./TeamPage.js";
 import SearchBox from "./SearchBox.js";
 
 class AllTeamsPage extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             name:"",
             
         }
         
         this.handleSearch = this.handleSearch.bind(this);
         
     }
 
     handleSearch = (e) => {
         this.setState({search:e.target.value})
     }
     render(){
         return (
             <div class="wrapper sidebar right">
                     <div class="inner">
                         <header >
                             <h2>Teams</h2>
                         </header>
                             <div class="content">
                                 <div class="inner">
                                  <Teams search={this.state.search}/>  
                                 </div>
                             </div>
                             <div class="sidebar">
                             <section>
                                 <div>
                                     <SearchBox 
                                      search={this.state.search} 
                                      handleSearch={this.handleSearch}/>
                                 </div>
                                 
                             <h2>Create a new Team</h2>
                                 <form method="post" action="#">
                                     <div class="row uniform">
                                         <div >
                                        <label>Team Name</label>
                                        <div>
                                         <input
                                         type='text'
                                         value={this.props.team_name}
                                         onChange={this.props.team_name}
                                         />
                                         </div>
                                     </div>
                                         <label>Game</label>
                                             <div >
                                                 <select value={this.props.game_id}>
                                                 <option value="1">Dota 2</option>
                                                 <option value="2">League of Legends</option>
                                                 <option value="3">Rainbow 6 Siege</option>
                                                 <option value="4">Rocket League</option>
                                                 <option value="5">Valorant</option>
                                                 <option value="6">Overwatch</option>
                                                   </select>
                                             </div>
                                     <div>
                                         <input type="submit" value="Send for approval" class="special" />
                                     </div>
                                     </div>
                                 </form>
                             </section>
                             </div>
                     </div>
         
             </div>
         );
      }
     }
 
 export default AllTeamsPage;