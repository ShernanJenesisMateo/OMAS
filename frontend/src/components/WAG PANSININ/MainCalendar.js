//FULLLLLLL CALENDARRRRRRRRRRR

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import "../css/style.css";

import axios from 'axios';

const MainCalendar = (props) => {
    // Events variable
    const [events, setEvents] = useState([]);

    // Populate calendar with events
    useEffect(() => {

        // Ajax request to call springboot controller that get all events
        axios.defaults.withCredentials = true;
        axios.get('/main/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Change events color if end time already passed
    useEffect(() => {
        const fetchEvents = () => {
          axios.defaults.withCredentials = true;
          axios
            .get('/main/events')
            .then((response) => {
              const updatedEvents = response.data.data.map((event) => {
                let color = event.color; // Default color from the server response
                const storedColor = localStorage.getItem(`eventColor_${event.id}`);
                if (storedColor) {
                  // If a color is stored in localStorage, use it
                  color = storedColor;
                } else if (moment().isAfter(moment(event.end))) {
                  // If the current time is after the event end and no color is stored, set the color to '#3D4849'
                  color = '#808080';
                  localStorage.setItem(`eventColor_${event.id}`, color); // Store the updated color in localStorage
                }
                return { ...event, color };
              });
              setEvents(updatedEvents);
            })
            .catch((error) => {
              console.log(error);
            });
        };

        // Fetch events initially
        fetchEvents();

        // const interval = setInterval(fetchEvents, 100);

        // Clean up the interval when the component is unmounted
        // return () => clearInterval(interval);
      }, []);



    // Fullcalendar toolbar
    const headerToolbar = {
        left: 'today,prev,next,title',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list customButton',
    };
    // Fullcalendar custom button (Add Appointment)
    const customButton = {
        text: '+ Add Appointment',
        click: function() {
            props.handleAddShow();
        }
    };

    // Get start and end datetime from dragging
    const handleSelect = (info) => {
        const selectStart = moment(info.startStr).format('YYYY-MM-DD HH:mm:ss');
        const selectEnd = moment(info.endStr).format('YYYY-MM-DD HH:mm:ss');
        props.handleAddShow(selectStart, selectEnd);
    };

    // Prevent selecting of past datetime
    const selectionHandler = (selectInfo) => {
        var currentTime = moment()
        return currentTime.isBefore(selectInfo.start)
    }

    // Fetching event when clicked
    const handleEventClick = (info) => {
        axios.get('/main/timetable/'+info.event.id)
            .then(response => {
                props.handleViewData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        props.handleViewShow();
    };

    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin
            ]}
            eventClick={handleEventClick}
            initialView="timeGridWeek"
            aspectRatio="2"
            height={'67vh'}
            handleWindowResize={true}
            stickyHeaderDates={true}
            nowIndicator={true}
            allDaySlot={false}
            // allDayDefault={false}
            selectable={true}
            select={handleSelect}
            selectAllow={selectionHandler}
            slotMinTime="06:00:00"
            slotMaxTime="19:00:00"
            eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                meridiem: "short"}}
            headerToolbar={headerToolbar}
            customButtons={{customButton}}
            events={events}
        />

        );

};

export default MainCalendar;