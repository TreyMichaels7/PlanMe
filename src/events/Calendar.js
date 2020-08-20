import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

/*
    Creates a Calendar with a full month view. Takes in a prop of data from the API call to put events onto the calendar.
*/
export class CalendarMain extends Component {

    //events prop in here works; data from API call works 
    calendarComponentRef = React.createRef()

    render() {
        let newEvents = [];
        for (let i = 0; i < this.props.events.length; i++) {
            newEvents[i] = {
                "title": this.props.events[i].title,
                "start": new Date(this.props.events[i].start_time.split(" ")[0])
            }
        }
        return (
            <div className={this.props.show ? "demo-app" : "demo-app hidden"}>
                <div className='demo-app-top'>
                </div>
                <div className='demo-app-calendar'>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                    }}
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    ref={ this.calendarComponentRef }
                    events={newEvents}
                />
                </div>
            </div>
        )
    }
}