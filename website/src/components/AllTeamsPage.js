
/**
 * Team page
 *
 * @author Harry Laws w19024957
 */

 import React from "react";
 import Teams from "./Teams.js";
 import TeamPage from "./TeamPage.js";
 import SearchBox from "./SearchBox.js";
 import NewTeam from "./NewTeam.js";
 class AllTeamsPage extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             name:"",
             
         }
         
         this.handleSearch = this.handleSearch.bind(this);
         this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
         this.handleTeamName = this.handleTeamName.bind(this);
         this.handleGameSelect = this.handleGameSelect.bind(this);
         
     }

     handleTeamSubmit = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/pendingteams"

        let formData = new FormData();
        formData.append('team_id', this.state.team_id);
        formData.append('team_name', this.state.team_name);
        formData.append('game_id', this.state.game_id);
        formData.append('team_lead', this.state.team_lead);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        
        .then( (data) => {
            this.setState({results:data.results})
          })
          .catch ((err) => { 
            console.log("something went wrong ", err) 
          });
    }
    

        
        handleGameSelect = (e) => {
        this.setState({ game_id: e.target.value })
        }
        handleTeamName = (e) => {
                this.setState({ team_name: e.target.value })
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
                                     <NewTeam
                                     handleTeamName={this.handleTeamName}
                                     handleGameSelect={this.handleGameSelect}
                                     handleTeamSubmit={this.handleTeamSubmit}/>
                                 </form>
                             </section>
                             </div>
                     </div>
         
             </div>
         );
      }
     }

 
 export default AllTeamsPage;