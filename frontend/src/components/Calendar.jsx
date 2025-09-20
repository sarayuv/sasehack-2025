import React from 'react';
import '../styles/Calendar.css';

const Calendar = ({events, users, onEventClick, onClose}) => (
    <div className="calendar-modal">
        <div className="calendar-modal-content">
            <button className="calendar-close-button" onClick={onClose}>×</button>
            <h2>Calendar</h2>

        </div>
    </div>
);

export default Calendar;