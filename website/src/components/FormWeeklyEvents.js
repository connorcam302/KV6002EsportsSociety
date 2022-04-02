import * as React from "react";
import Button from '@mui/material/Button';
import Teams from './Teams'

/**
* FormWeeklyEvents
* 
* This class is used to create the form necessary to create and upload weekly event forms onto the Weekly events page of the website.
*
* @author Ethan Borrill W18001798
*/

class FormWeeklyEvents extends React.Component {
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

                <ul><Button onClick={this.props.handleEventSubmit}>Submit Event</Button></ul>
            </div>
        );
    }
}

export default FormWeeklyEvents;