import React, {useState, useEffect} from 'react';
import '../styles/Reminders.css';

function ReminderList({reminderList, addReminder}) {
  const [newReminder, setNewReminder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReminder = () => {
    addReminder(newReminder);
    setNewReminder("");
    setIsModalOpen(false);
  }

  return (
      <div className='reminders'>
        <button onClick={() => setIsModalOpen(true)}>Open Reminders</button>

        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <h2>Shopping List</h2>
              <ul>
                {reminderList.map((reminder, index) => (
                  <li key={index}>{reminder}</li>
                ))}
              </ul>
              <input 
                type="text" 
                value={newReminder} 
                onChange={(e) => setNewItem(e.target.value)} 
                placeholder="Add new reminder" 
              />
              <button onClick={handleAddReminder}>Add Reminder</button>
              <button className='close-button' onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
  );
}

export default ReminderList
