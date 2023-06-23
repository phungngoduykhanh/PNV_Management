import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    if (title) {
      setNewEvent(newEvent);
      setShowEventForm(true);
    }
  };
  const handleEventFormSubmit = () => {
    if (newEvent) {
      setEvents([...events, newEvent]);
      setNewEvent(null);
      setShowEventForm(false);
    }
  };
  const handleEventFormCancel = () => {
    setNewEvent(null);
    setShowEventForm(false);
  };
  const handleEventDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event !== selectedEvent);
      setEvents(updatedEvents);
      setSelectedEvent(null);
    }
  };
  const EventForm = () => {
    return (
      <div className="event-form">
        <h2>Create Event</h2>
        <form>
          <div className="form-group">
            <label htmlFor="event-title">Title:</label>
            <div className="input-group">
              <input
                id="event-title"
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <button type="button" onClick={handleEventFormSubmit}>
                Save
              </button>
              <button type="button" onClick={handleEventFormCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const EventDetails = () => {
    return (
      <div className="event-details">
        <h2>Event Details</h2>
        <p>Title: {selectedEvent.title}</p>
        <p>
          Time: {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleString()}
        </p>
        <button type="button" onClick={handleEventDelete}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
/>
      {showEventForm && <EventForm />}
      {selectedEvent && <EventDetails />}
    </div>
  );
};

export default MyCalendar;
