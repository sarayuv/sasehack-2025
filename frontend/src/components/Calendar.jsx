import React from 'react';
import '../styles/Calendar.css';

const Calendar = ({events, users, onEventClick, onClose}) => (
    <div className="calendar-modal">
        <div className="calendar-modal-content">
            <button className="calendar-close-button" onClick={onClose}>×</button>
            <h2>Calendar</h2>
            <div className="calendar-events">
                {events.length === 0 && <div>No events scheduled</div>}
                {events.map(event => {
                    const user = users.find(u => u.name === event.user);
                    return (
                        <div key={event.id} className="calendar-event" onClick={() => onEventClick(event)}>
                            <strong>{event.title}</strong><br />
                            <span>{event.date}</span><br />
                            <span style={{fontSize: "0.8em"}}>For: {event.user}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default Calendar;