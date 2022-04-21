import React from "react";
import WeeklyEvent from "./WeeklyEvent";
class WeeklyEvents extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []

        }
        console.log("constructor")
    }

    componentDidMount() {
        const url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/events"

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

    render() {
      let noData = "" 
      if (this.state.results.length === 0) {
          noData = <p>No data</p>
      }
      const filteredResults = this.state.results
      return (
          <div>
              {filteredResults.map( (events, i) => (<WeeklyEvent key={i} events={events}/>) )}
          </div>
      )
  }
}

export default WeeklyEvents;
