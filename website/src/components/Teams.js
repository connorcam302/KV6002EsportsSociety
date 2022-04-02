/**
 * teams Class
 *
 * @team Harry Laws w19024957
 */
 
 import React from "react";
 import Team from "./Team.js";
class Teams extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
            
        }
        console.log("constructor")
    }
    
    componentDidMount() {
        const url = "http://unn-w19024957.newnumyspace.co.uk/KV6002/Assessment/api/team"

        let formData = new FormData();
        formData.append('team_name', this.state.team_name);
        formData.append('team_game', this.state.team_game)

        if (this.props.id !== undefined) {
          url += "?id=" + this.props.id
          console.log(url)
      }

        fetch(url)
          .then( (response) => {
              if (response.status === 200) {
                return response.json() 
              } else {
                throw Error(response.statusText);
              }
          })
          .then( (data) => {
            this.setState({results:data.results})
          })
          .catch ((err) => { 
            console.log("something went wrong ", err) 
          });
    }

    filterSearch = (s) => {
    return s.team_name.toLowerCase().includes(this.props.search.toLowerCase())
 }

    
      render() {
        let noData = "" 
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }
       let filteredResults = this.state.results

        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
          filteredResults = filteredResults.filter(this.filterSearch) 
      }
        return (
            <div>
                {filteredResults.map( (team, i) => (<Team key={team.team_name} team={team}/>) )}
            </div>
        )
    }
}

export default Teams;
