import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '../Stylesheets/UserCalendar.css';
import { CreateDateFormatArray } from '../Utilities/HelperFunctions';

const localizer = dayjsLocalizer(dayjs);

const UserCalendar = () => {
    const [event, setEvents] = useState([]);
    const [currentDate, updateCurrentDate] = useState();
    const domain = useSelector((state) => state.domain.value);
    const user = useSelector((state) => state.user);
    const [errorMessage, updateErrorMessage] = useState("");
    const [eventTitle, updateEventTitle] = useState("");
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

    const [detailEventTitle, updateDetailEventTitle] = useState("");
    const [errorMessageDetail, updateErrorMessageDetail] = useState("");
    const [startDateDetail, updateStartDateDetail] = useState({
        "date": null,
        "hours": 0,
        "minutes": 0,
        "seconds": 0
    });
    const [endDateDetail, updateEndDateDetail] = useState({
        "date": null,
        "hours": 0,
        "minutes": 0,
        "seconds": 0
    });

    const [selectedEvents, updatedSelectedEvents] = useState({})

    const pullEventsFromBackend = () => {
        let config = {
            headers: { Authorization: `Bearer ${user.token}` }
        }

        axios.get(`https://${domain}/api/Activities/userActivity/${user.id}`, config)
        .then(function(response) {
            //console.log(response);
            
            let eventsFromDb = []; //makes a new events array
            for(let i = 0; i < response.data.length; i++) { //go through each event we get back from backend
                const { id, activityName: title, activityStartTime, activityEndTime } = response.data[i]; //destructure
                let tmpStartTime = new Date(activityStartTime);
                let tmpEndTime = new Date(activityEndTime);

                let newDateStart = new Date(tmpStartTime.getTime() + tmpStartTime.getTimezoneOffset() * 60 * 1000); //convert start time to local time from UTC
                let offsetStart = tmpStartTime.getTimezoneOffset() / 60;
                let hoursStart = tmpStartTime.getHours();
                newDateStart.setHours(hoursStart - offsetStart);

                let newDateEnd = new Date(tmpEndTime.getTime() + tmpEndTime.getTimezoneOffset() * 60 * 1000); //convert end time to local time from UTC
                let offsetEnd = tmpEndTime.getTimezoneOffset() / 60;
                let hoursEnd = tmpEndTime.getHours();
                newDateEnd.setHours(hoursEnd - offsetEnd);

                eventsFromDb.push({ id, title, start: newDateStart , end: newDateEnd })
            }
            
            setEvents(eventsFromDb); //sets the events to the ones pulled from backend
        })
        .catch(function(err) {
            console.log(err);
        })
    }


    useEffect(pullEventsFromBackend,[user, domain]);

    useEffect(function() {
        let currDate = new Date();
        let d = CreateDateFormatArray(currDate);
        let combinedDate = d.join("-");
        updateCurrentDate(combinedDate);

        updateStartDate({  date: combinedDate, "hours": 0, "minutes": 0, "seconds": 0 })
        updateEndDate({ date: combinedDate, "hours": 0, "minutes": 0, "seconds": 0 })
    }, [])

    // click event for clicking on an item in the time table
    const f = (e) => {
        let selectedEventStartDate = new Date(e.start);

        let selectedEventStartDateD = CreateDateFormatArray(selectedEventStartDate);

        let selectedEventEndDate = new Date(e.end);

        let selectedEventEndDateD = CreateDateFormatArray(selectedEventEndDate);

        //console.log(selectedEventStartDateD);

        updatedSelectedEvents({
            "id": e.id,
            "title": e.title,
        })

        updateDetailEventTitle(e.title);

        updateStartDateDetail({
            "date": selectedEventStartDateD.join("-"),
            "hours": selectedEventStartDate.getHours(),
            "minutes": selectedEventStartDate.getMinutes(),
            "seconds": selectedEventStartDate.getSeconds()
        })

        updateEndDateDetail({
            "date": selectedEventEndDateD.join("-"),
            "hours": selectedEventEndDate.getHours(),
            "minutes": selectedEventEndDate.getMinutes(),
            "seconds": selectedEventEndDate.getSeconds()
        })

        // clear the error message every time you click on a time table slot
        updateErrorMessage("");
        updateErrorMessageDetail("");

        //console.log(selectedEventStartDate);
        //console.log(selectedEvents);
    }

    // update start date whenever a number is updated
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

    // update whenever an end date is updated
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

    // update start date detail
    const updateStartDatesDetail = (e) => {
        switch(e.target.id) {
            case 'startDateDetail':
                updateStartDateDetail({ ...startDateDetail, date: e.target.value || currentDate })
                break;
            case 'startHoursDetail':
                updateStartDateDetail({ ...startDateDetail, hours: e.target.value || 0 })
                break;
            case 'startMinutesDetail':
                updateStartDateDetail({ ...startDateDetail, minutes: e.target.value || 0 })
                break;
            case 'startSecondsDetail':
                updateStartDateDetail({ ...startDateDetail, seconds: e.target.value || 0 })
                break;
            default:
                break;
        }
    }

    // update end date detail
    const updateEndDatesDetail = (e) => {
        switch(e.target.id) {
            case 'endDateDetail':
                updateEndDateDetail({ ...endDateDetail, date: e.target.value || currentDate })
                break;
            case 'endHoursDetail':
                updateEndDateDetail({ ...endDateDetail, hours: e.target.value || 0 })
                break;
            case 'endMinutesDetail':
                updateEndDateDetail({ ...endDateDetail, minutes: e.target.value || 0 })
                break;
            case 'endSecondsDetail':
                updateEndDateDetail({ ...endDateDetail, seconds: e.target.value || 0 })
                break;
            default:
                break;
        }
    }

    // making a new event on a calendar
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

        if(eventTitle.length === 0) {
            updateErrorMessage("Please make sure to enter an event title");
            return;
        }

        //POST TO BACKEND in UTC
        let postObject = {
            ActivityName: eventTitle,
            ActivityStartTime: finalStartDate.toISOString(),
            ActivityEndTime: finalEndDate.toISOString()
        }

        //console.log(postObject);

        let config = {
            headers: { Authorization: `Bearer ${user.token}` }
        }

        axios.post(`https://${domain}/api/Activities?userId=${user.id}`, postObject, config)
        .then(function(response) {
            console.log(response);
            updateErrorMessage("Successfully added event!");
            pullEventsFromBackend(); //pulls new data from db to rerender page
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    // updating an event
    const onUpdateEvent = (e) => {
        e.preventDefault();

        if(startDateDetail.hours > 23 || endDateDetail.hours > 23 || startDateDetail.hours < 0 || endDateDetail.hours < 0) {
            updateErrorMessageDetail("Please enter between 0-23 in hours");
            return;
        }

        if(startDateDetail.minutes > 59 || endDateDetail.minutes > 59 || startDateDetail.minutes < 0 || endDateDetail.minutes < 0) {
            updateErrorMessageDetail("Please enter between 0-59 in minutes");
            return;
        }

        if(startDateDetail.seconds > 59 || endDateDetail.seconds > 59 || startDateDetail.seconds < 0 || endDateDetail.seconds < 0) {
            updateErrorMessageDetail("Please enter between 0-59 in seconds");
            return;
        }

        let selectedEventStartDate = new Date(startDateDetail.date);

        let selectedEventStartDateD = CreateDateFormatArray(selectedEventStartDate);

        let selectedEventEndDate = new Date(endDateDetail.date);

        let selectedEventEndDateD = CreateDateFormatArray(selectedEventEndDate);

        let finalStartDate = new Date(selectedEventStartDateD.join("-") + " " + startDateDetail.hours + ":" + startDateDetail.minutes + ":" + startDateDetail.seconds);
        let finalEndDate = new Date(selectedEventEndDateD.join("-") + " " + endDateDetail.hours + ":" + endDateDetail.minutes + ":" + endDateDetail.seconds);

        finalStartDate.setDate(finalStartDate.getDate() + 1);
        finalEndDate.setDate(finalEndDate.getDate() + 1);

        if(finalEndDate < finalStartDate) {
            updateErrorMessageDetail("Please make sure that the end date is on the same day or after the start date");
            return;
        }

        if(detailEventTitle === 0) {
            updateErrorMessageDetail("Please make sure to enter an event title");
            return;
        }

        let putObj = {
            "Id": selectedEvents.id,
            "ActivityName": detailEventTitle,
            "ActivityStartTime": finalStartDate.toISOString(),
            "ActivityEndTime": finalEndDate.toISOString(),
            "PlannedTasksId": user.plannedUserId
        }

        let config = {
            headers: { Authorization: `Bearer ${user.token}` }
        }

        //console.log(putObj)

        axios.put(`https://${domain}/api/Activities`, putObj, config)
        .then(function(response) {
            console.log(response);
            pullEventsFromBackend(); //pulls new data from db to rerender page
            updateErrorMessageDetail("Updated successfully!");
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    // deleting an event
    const onDeleteEvent = (e) => {
        e.preventDefault();

        let config = {
            headers: { Authorization: `Bearer ${user.token}` }
        }

        axios.delete(`https://${domain}/api/Activities/${selectedEvents.id}`, config)
        .then(function(response) {
            console.log(response);
            pullEventsFromBackend();
            updatedSelectedEvents({});
            updateStartDateDetail({
                "date": null,
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            });

            updateEndDateDetail({
                "date": null,
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            })

            updateErrorMessageDetail("");
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    const updateET = (e) => {
        updateEventTitle(e.target.value);
    }

    const updateDET = (e) => {
        updateDetailEventTitle(e.target.value);
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
            />

            <div className="inline-containers">
                <div className="inline-inner-containers">
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

                        {errorMessage !== "" && (
                        <>
                            <br/><br/>
                            <div className="error-message-usercalendar">
                                {errorMessage}
                            </div>
                        </>
                        )}
                    </form>
                </div>
                { startDateDetail.date != null && 
                    <div className="inline-inner-containers">
                        <form className="details-event">
                            <strong className="usercalendar-header">Event Details</strong><br/><br/>
                            <strong>Event Title</strong><br/><br/>
                            <input type="text" name="eventTitle" onChange={updateDET} value={detailEventTitle}></input><br/><br/>
                            <div className="start-time-container time-containers">
                                <div className="start-date">
                                    <strong>Start Time</strong>
                                    <input type="date" name="startDateDetail" id="startDateDetail" onChange={updateStartDatesDetail} min={currentDate} value={startDateDetail.date}></input>
                                </div>
                                <div className="specific-time-container">
                                    <strong>Time</strong>
                                    <div className="specific-time-inner-container">
                                        <input type="number" name="startHoursDetail" id="startHoursDetail" max="0" min="23" onChange={updateStartDatesDetail} value={startDateDetail.hours}></input>
                                        <span>h</span>
                                        <input type="number" name="startMinutesDetail" id="startMinutesDetail" max="0" min="59" onChange={updateStartDatesDetail} value={startDateDetail.minutes}></input>
                                        <span>m</span>
                                        <input type="number" name="startSecondsDetail" id="startSecondsDetail" max="0" min="59" onChange={updateStartDatesDetail} value={startDateDetail.seconds}></input>
                                        <span>s</span>
                                    </div>
                                </div>
                            </div>
                            <div className="end-time-container time-containers">
                                <div className="end-date">
                                    <strong>End Time</strong>
                                    <input type="date" name="endDateDetail" id="endDateDetail" onChange={updateEndDatesDetail} min={startDateDetail.date} value={endDateDetail.date}></input>
                                </div>
                                <div className="specific-time-container">
                                <strong>Time</strong>
                                    <div className="specific-time-inner-container">
                                        <input type="number" name="endHoursDetail" id="endHoursDetail" max="0" min="23" onChange={updateEndDatesDetail} value={endDateDetail.hours}></input>
                                        <span>h</span>
                                        <input type="number" name="endMinutesDetail" id="endMinutesDetail" max="0" min="59" onChange={updateEndDatesDetail} value={endDateDetail.minutes}></input>
                                        <span>m</span>
                                        <input type="number" name="endSecondsDetail" id="endSecondsDetail" max="0" min="59" onChange={updateEndDatesDetail} value={endDateDetail.seconds}></input>
                                        <span>s</span>
                                    </div>
                                </div>
                            </div>
                            <button name="updateEvent" onClick={onUpdateEvent}>Update</button>
                            <button name="deleteEvent" onClick={onDeleteEvent}>Delete</button>

                            {errorMessageDetail !== "" && (
                            <>
                                <br/><br/>
                                <div className="error-message-usercalendar">
                                    {errorMessageDetail}
                                </div>
                            </>
                            )}
                        </form>
                    </div>
                }
            </div>
            
        </div>
    );
};

export default UserCalendar;