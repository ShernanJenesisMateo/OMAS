import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

function Calendar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]); // State to store calendar events

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDateChange = (value: string, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartDate(value);
    } else if (type === 'end') {
      setEndDate(value);
    }
  };

  const handleAddAppointment = () => {
    const newEvent = {
      title: 'Reserved', 
      start: startDate,
      end: endDate,
      allDay: false,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    handleModalClose();
  };

  const customButton = {
    text: '+ Reserve Seat',
    click: handleModalOpen,
  };

  const headerToolbar = {
    left: 'today,prev,next,title',
    center: '',
    right: 'timeGridWeek,dayGridMonth,timeGridDay customButton',
  };

  useEffect(() => {
    fetch("http://localhost:3001/dates")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={headerToolbar}
        height={'67vh'}
        handleWindowResize={true}
        stickyHeaderDates={true}
        nowIndicator={true}
        allDaySlot={false}
        selectable={true}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: "short"}}
        slotMinTime="06:00:00"
        slotMaxTime="19:00:00"
        customButtons={{ customButton }}
        events={events}
      />

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Add Reservation</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Date"
            type="datetime-local"
            onChange={(e) => handleDateChange(e.target.value, 'start')}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="End Date"
            type="datetime-local"
            onChange={(e) => handleDateChange(e.target.value, 'end')}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Button onClick={handleAddAppointment} variant="contained" color="primary">
            Add Reservation
          </Button>
          <Button onClick={handleModalClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Calendar;
