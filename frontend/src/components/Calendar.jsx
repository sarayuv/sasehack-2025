import React, { useState } from 'react';
import '../styles/Calendar.css';

function getWeekDates() {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return Array.from({length: 7}, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
}

function getMonthDates(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d));
    }
    return days;
}

const Calendar = ({ events, users, addEvent }) => {
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formDate, setFormDate] = useState("");
    const [formUser, setFormUser] = useState(users[0]?.name || "");

    return (
        <>
            <img
                src="/calendar.svg"
                alt="Monthly Calendar"
                className="calendar-fridge-image"
                onClick={() => setIsMonthModalOpen(true)}
            />

            <button
                className="calendar-add-button calendar-add-event-btn"
                onClick={() => setIsAddEventModalOpen(true)}
            >
                + Add Event
            </button>

            {isMonthModalOpen && (
                <div className="calendar-modal">
                    <div className="calendar-modal-content calendar-modal-month">
                        <button className="calendar-close-button" onClick={() => setIsMonthModalOpen(false)}>×</button>
                        <MonthCalendar events={events} users={users} />
                            <button
                                className="calendar-add-button"
                                style={{marginTop: '24px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                                onClick={() => {
                                    setIsMonthModalOpen(false);
                                    setIsAddEventModalOpen(true);
                                }}
                            >
                                + Add Event
                            </button>
                    </div>
                </div>
            )}

            {isAddEventModalOpen && (
                <div className="calendar-modal">
                    <div className="calendar-modal-content calendar-modal-add">
                        <button className="calendar-close-button" onClick={() => setIsAddEventModalOpen(false)}>×</button>
                        <h2 className="calendar-add-title">Add Event</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                if (formTitle && formDate && formUser) {
                                    addEvent(formTitle, formDate, formUser);
                                    setFormTitle("");
                                    setFormDate("");
                                    setFormUser(users[0]?.name || "");
                                    setIsAddEventModalOpen(false);
                                    setIsMonthModalOpen(true);
                                }
                            }}
                        >
                            <input
                                name="title"
                                placeholder="Event Title"
                                value={formTitle}
                                onChange={e => setFormTitle(e.target.value)}
                                required
                                className="calendar-input"
                            />
                            <input
                                name="date"
                                type="date"
                                value={formDate}
                                onChange={e => setFormDate(e.target.value)}
                                required
                                className="calendar-input"
                            />
                            <select
                                name="user"
                                value={formUser}
                                onChange={e => setFormUser(e.target.value)}
                                required
                                className="calendar-input"
                            >
                                {users.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                            <button type="submit" className="calendar-add-button calendar-add-submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

function MonthCalendar({ events, users }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const monthDates = getMonthDates(year, month);
    const firstDayOfWeek = monthDates[0].getDay();
    const weeks = [];
    let week = Array(firstDayOfWeek).fill(null);
    monthDates.forEach((date, i) => {
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
        week.push(date);
    });
    if (week.length) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
    }

    const eventsByDay = monthDates.map(date => {
        const dayStr = date.toISOString().slice(0, 10);
        return events ? events.filter(ev => ev.date === dayStr) : [];
    });

    return (
        <div className="calendar-month-view">
            <h2 style={{marginBottom: '16px', fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center', letterSpacing: '2px'}}>{today.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</h2>
            <div className="calendar-month-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px'}}>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
                    <div key={day} style={{fontWeight: 'bold', textAlign: 'center', marginBottom: '4px'}}>{day}</div>
                ))}
                {weeks.map((weekArr, wi) => weekArr.map((date, di) => (
                    <div key={wi + '-' + di} className="calendar-month-day" style={{background: '#f7f7f7', borderRadius: '8px', minHeight: '80px', padding: '6px', textAlign: 'left', position: 'relative'}}>
                        {date && <div style={{fontWeight: 'bold'}}>{date.getDate()}</div>}
                        {date && eventsByDay[monthDates.indexOf(date)].map(ev => {
                            const user = users.find(u => u.name === ev.user);
                            return (
                                <div
                                    key={ev.id}
                                    className="calendar-event"
                                    style={{ backgroundColor: user?.color || '#eee', color: '#222', marginBottom: '4px', borderRadius: '6px', padding: '3px', fontSize: '0.9em' }}
                                >
                                    <strong>{ev.title}</strong><br />
                                    <span style={{ fontSize: '0.85em' }}>{ev.user}</span>
                                </div>
                            );
                        })}
                    </div>
                )))}
            </div>
        </div>
    );
}

export default Calendar;