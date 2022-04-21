import React from "react";

class WeeklyEvent extends React.Component {

    constructor(props) {
        super(props)
            this.state = { display: false }
        }

        render(){
            return (
            
<div class="eventrow">
  <div class="eventcolumn">
    <h2>{this.props.events.event_name}</h2>
    <h3>{this.props.events.event_date}</h3>
    <p>{this.props.events.event_description}</p>
  </div>
</div>

            );
        }
    }

export default WeeklyEvent;