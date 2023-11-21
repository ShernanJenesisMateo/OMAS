import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const customButton = {
    text: '+ Add Appointment',
    click: handleModalOpen,
  };


  const headerToolbar = {
    left: 'today,prev,next,title',
    center: '',
    right: 'timeGridWeek,dayGridMonth,timeGridDay, customButton',
  };


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
      />


    </div>
  );
}


export default Calendar;