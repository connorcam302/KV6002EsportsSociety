import React from "react";

class WeeklyEventsForm extends React.Component {
    render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='Title of event'
                    value={this.props.eventTitle}
                    onChange={this.props.handleEventTitle}
                />
                <input
                    type='text'
                    placeholder='Description of event'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventDesc}
                />
                <button onClick={this.props.handleEventSubmit}>Submit Event</button>
            </div>
        );
    }
}

export default WeeklyEventsForm;