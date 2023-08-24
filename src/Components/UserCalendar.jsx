import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '../Stylesheets/UserCalendar.css';

const localizer = dayjsLocalizer(dayjs);

const UserCalendar = () => {
    const [event, setEvents] = useState([]);
    const domain = useSelector((state) => state.domain.value);
    const user = useSelector((state) => state.user);
    const [errorMessage, updateErrorMessage] = useState("");
    const [eventTitle, updateEventTitle] = useState("");
    const [startDate, updateStartDate] = useState({
        "date": null,
        "hours": -1,
        "minutes": -1,
        "seconds": -1
    });
    const [endDate, updateEndDate] = useState({
        "date": null,
        "hours": -1,
        "minutes": -1,
        "seconds": -1
    });


    useEffect(function() {
        axios.get(`https://${domain}/api/Activities/userActivity/${user.id}`)
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

    },[user]);

    const [bcView, setBCView] = useState("month")

    const f = (e) => {
        setBCView("week"); //when you click on something in the month calendar, it goes to the weeks calendar
    }

    const updateStartDates = (e) => {
        switch(e.target.id) {
            case 'startDate':
                updateStartDate({ ...startDate, date: e.target.value })
                break;
            case 'startHours':
                updateStartDate({ ...startDate, hours: e.target.value })
                break;
            case 'startMinutes':
                updateStartDate({ ...startDate, minutes: e.target.value })
                break;
            case 'startSeconds':
                updateStartDate({ ...startDate, seconds: e.target.value })
                break;
            default:
                break;
        }
        
        console.log(startDate);
    }

    const updateEndDates = (e) => {
        switch(e.target.id) {
            case 'endDate':
                updateEndDate({ ...endDate, date: e.target.value })
                break;
            case 'endHours':
                updateEndDate({ ...endDate, hours: e.target.value })
                break;
            case 'endMinutes':
                updateEndDate({ ...endDate, minutes: e.target.value })
                break;
            case 'endSeconds':
                updateEndDate({ ...endDate, seconds: e.target.value })
                break;
            default:
                break;
        }

        console.log(endDate)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(endDate.date < startDate.date) {
            updateErrorMessage("Please make sure that the end date is on the same day or after the start date");
        }
    }

    return (
        <div className="user-calendar">
            <h1>Hello {user.name}!</h1>
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

            <form className="add-event">
                <strong className="usercalendar-header">Add event</strong><br/><br/>
                <strong>Event Title</strong><br/><br/>
                <input type="text" name="eventTitle"></input><br/><br/>
                <div className="start-time-container time-containers">
                    <div className="start-date">
                        <strong>Start Time</strong>
                        <input type="date" name="startDate" id="startDate" onChange={updateStartDates}></input>
                    </div>
                    <div className="specific-time-container">
                        <strong>Time</strong>
                        <div className="specific-time-inner-container">
                            <input type="number" name="startHours" id="startHours" max="0" min="23" onChange={updateStartDates}></input>
                            <span>h</span>
                            <input type="number" name="startMinutes" id="startMinutes" max="0" min="59" onChange={updateStartDates}></input>
                            <span>m</span>
                            <input type="number" name="startSeconds" id="startSeconds" max="0" min="59" onChange={updateStartDates}></input>
                            <span>s</span>
                        </div>
                    </div>
                </div>
                <div className="end-time-container time-containers">
                    <div className="end-date">
                        <strong>End Time</strong>
                        <input type="date" name="endDate" id="endDate" onChange={updateEndDates} min={startDate.date}></input>
                    </div>
                    <div className="specific-time-container">
                    <strong>Time</strong>
                        <div className="specific-time-inner-container">
                            <input type="number" name="endHours" id="endHours" max="0" min="23" onChange={updateEndDates}></input>
                            <span>h</span>
                            <input type="number" name="endMinutes" id="endMinutes" max="0" min="59" onChange={updateEndDates}></input>
                            <span>m</span>
                            <input type="number" name="endSeconds" id="endSeconds" max="0" min="59" onChange={updateEndDates}></input>
                            <span>s</span>
                        </div>
                    </div>
                </div>
                <button name="submit" onClick={onSubmit}>Submit</button>

                {errorMessage != "" && (
                <>
                    <br/><br/>
                    <div className="error-message-usercalendar">
                        {errorMessage}
                    </div>
                </>
                )}
            </form>
            
        </div>
    );
};

export default UserCalendar;