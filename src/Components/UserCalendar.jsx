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
    const [currentDate, updateCurrentDate] = useState();
    const [startDate, updateStartDate] = useState({
        "date": new Date(),
        "hours": 0,
        "minutes": 0,
        "seconds": 0
    });
    const [endDate, updateEndDate] = useState({
        "date": new Date(),
        "hours": 0,
        "minutes": 0,
        "seconds": 0
    });

    const pullEventsFromBackend = () => {
        axios.get(`https://${domain}/api/Activities/userActivity/${user.id}`)
        .then(function(response) {
            //console.log(response);
            
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
    }


    useEffect(pullEventsFromBackend,[user]);

    useEffect(function() {
        let currDate = new Date();
        let d = [
            currDate.getFullYear(),
            ('0' + (currDate.getMonth() + 1)).slice(-2),
            ('0' + currDate.getDate()).slice(-2),
        ]
        let combinedDate = d.join("-");
        updateCurrentDate(combinedDate);

        updateStartDate({ ...startDate, date: combinedDate })
        updateEndDate({ ...endDate, date: combinedDate })
    },[])

    const [bcView, setBCView] = useState("month")

    const f = (e) => {
        setBCView("week"); //when you click on something in the month calendar, it goes to the weeks calendar
    }

    const updateStartDates = (e) => {
        switch(e.target.id) {
            case 'startDate':
                updateStartDate({ ...startDate, date: e.target.value || currentDate })
                break;
            case 'startHours':
                updateStartDate({ ...startDate, hours: e.target.value || 0 })
                break;
            case 'startMinutes':
                updateStartDate({ ...startDate, minutes: e.target.value || 0 })
                break;
            case 'startSeconds':
                updateStartDate({ ...startDate, seconds: e.target.value || 0 })
                break;
            default:
                break;
        }
        
    }

    const updateEndDates = (e) => {
        switch(e.target.id) {
            case 'endDate':
                updateEndDate({ ...endDate, date: e.target.value || currentDate })
                break;
            case 'endHours':
                updateEndDate({ ...endDate, hours: e.target.value || 0 })
                break;
            case 'endMinutes':
                updateEndDate({ ...endDate, minutes: e.target.value || 0 })
                break;
            case 'endSeconds':
                updateEndDate({ ...endDate, seconds: e.target.value || 0 })
                break;
            default:
                break;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(startDate.hours > 23 || endDate.hours > 23 || startDate.hours < 0 || endDate.hours < 0) {
            updateErrorMessage("Please enter between 0-23 in hours");
            return;
        }

        if(startDate.minutes > 59 || endDate.minutes > 59 || startDate.minutes < 0 || endDate.minutes < 0) {
            updateErrorMessage("Please enter between 0-59 in minutes");
            return;
        }

        if(startDate.seconds > 59 || endDate.seconds > 59 || startDate.seconds < 0 || endDate.seconds < 0) {
            updateErrorMessage("Please enter between 0-59 in seconds");
            return;
        }

        let finalStartDate = new Date(startDate.date + " " + startDate.hours + ":" + startDate.minutes + ":" + startDate.seconds);
        let finalEndDate = new Date(endDate.date + " " + endDate.hours + ":" + endDate.minutes + ":" + endDate.seconds);

        if(finalEndDate < finalStartDate) {
            updateErrorMessage("Please make sure that the end date is on the same day or after the start date");
            return;
        }

        if(eventTitle.length == 0) {
            updateErrorMessage("Please make sure to enter an event title");
            return;
        }

        //POST TO BACKEND
        let postObject = {
            ActivityName: eventTitle,
            ActivityStartTime: finalStartDate,
            ActivityEndTime: finalEndDate
        }

        axios.post(`https://${domain}/api/Activities?userId=${user.id}`, postObject)
        .then(function(response) {
            console.log(response);
            updateErrorMessage("Successfully added event!");
            pullEventsFromBackend(); //pulls new data from db to rerender page
        })
        .catch(function(err) {
            console.log(err);
        })

    }

    const updateET = (e) => {
        updateEventTitle(e.target.value);
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
                <input type="text" name="eventTitle" onChange={updateET}></input><br/><br/>
                <div className="start-time-container time-containers">
                    <div className="start-date">
                        <strong>Start Time</strong>
                        <input type="date" name="startDate" id="startDate" onChange={updateStartDates} min={currentDate}></input>
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