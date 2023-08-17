import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = dayjsLocalizer(dayjs);

const UserCalendar = () => {
    const [event, setEvents] = useState([]);
    const domain = useSelector((state) => state.domain.value);
    const userId = useSelector((state) => state.user.id);

    useEffect(function() {
        axios.get(`https://${domain}/api/Activities/userActivity/${userId}`)
        .then(function(response) {
            console.log(response);
            
            let eventsFromDb = []; //makes a new events array
            for(let i = 0; i < response.data.length; i++) { //go through each even we get back from backend
                const { id, activityName: title, activityStartTime, activityEndTime, plannedTaskId } = response.data[i]; //destructure

                eventsFromDb.push({ id, title, start: new Date(activityStartTime), end: new Date(activityEndTime) })
            }

            setEvents(eventsFromDb); //sets the events to the ones pulled from backend
        })
        .catch(function(err) {
            console.log(err);
        })

    },[userId]);

    const [bcView, setBCView] = useState("month")

    const f = (e) => {
        setBCView("week"); //when you click on something in the month calendar, it goes to the weeks calendar
    }

    return (
        <div className="user-calendar">
            <h1>This is user calendar</h1>
            <Calendar
                localizer={localizer}
                events={event}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={f}
                view={bcView}
                onView={setBCView}
            />
        </div>
    );
};

export default UserCalendar;