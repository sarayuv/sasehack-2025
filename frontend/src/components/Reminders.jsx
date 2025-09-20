import React, { useState } from 'react';
import '../styles/Reminders.css';

const Reminders = ({ reminders, addReminder, toggleCrossReminder, isRemindersModalOpen, setIsRemindersModalOpen }) => {
  const [newReminder, setNewReminder] = useState('');

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      addReminder(newReminder);
      setNewReminder('');
    }
  };

  return (
    <div className="main-reminders-list" style={{ position: 'absolute', left: '540px', top: '80px' }}>
      <h2>Reminders</h2>
      <div>
        {reminders.slice(0, 3).map(reminder => (
          <div key={reminder.id}>
            <span 
              className={reminder.crossedOut ? 'reminders-crossed' : ''} 
              onClick={() => toggleCrossReminder(reminder.id)}
            >
              {reminder.text}
            </span>
          </div>
        ))}
      </div>
      
      <button className="open-reminders-list-button" onClick={() => setIsRemindersModalOpen(true)}>
        Open
      </button>

      {isRemindersModalOpen && (
        <div className="reminders-modal">
          <div className="reminders-modal-content">
            <button className="reminders-close-button" onClick={() => setIsRemindersModalOpen(false)}>×</button>
            <h2>Reminders</h2>
            
            <div className="reminders-input-section">
              <input
                type="text"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Add a reminder..."
                className="reminders-input"
              />
              <button onClick={handleAddReminder} className="reminders-button reminders-add-btn">+</button>
            </div>

            <div className="reminders-list">
              {reminders.map(reminder => (
                <div key={reminder.id} className="reminders-item">
                  <span 
                    className={reminder.crossedOut ? 'reminders-crossed' : ''} 
                    onClick={() => toggleCrossReminder(reminder.id)}
                  >
                    {reminder.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
