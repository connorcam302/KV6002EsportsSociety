import React from "react";

class WeeklyEventsForm extends React.Component {
    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Title of event'
                    value={this.props.eventTitle}
                    onChange={this.props.handleEventTitle}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Game being played'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventGame}
                /></ul>

                <ul><textarea
                    type='text'
                    placeholder='Description of event'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventDesc}
                /></ul>

                <ul><input
                    type='text'
                    placeholder='Date & Time of event'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventTime}
                /></ul>

                <ul><button onClick={this.props.handleEventSubmit}>Submit Event</button></ul>
            </div>
        );
    }
}

export default WeeklyEventsForm;