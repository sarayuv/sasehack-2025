import React, {useState, useEffect} from 'react'

function Reminders() {
  const [reminders, setReminder] = useState([]);
  const [newReminders, setNewReminder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/reminders").then((response) => response.json()).then((data) => setReminders(data.items));
  }, []);

  const addReminder = () => {
    fetch("/api/reminders", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({item: newReminders}),
    }).then((response) => response.json()).then((data) => setReminders(data.reminders));
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
                {reminders.map((reminder, index) => (
                  <li key={index}>{reminder}</li>
                ))}
              </ul>
              <input 
                type="text" 
                value={newReminders} 
                onChange={(e) => setNewReminder(e.target.value)} 
                placeholder="Add new reminder" 
              />
              <button onClick={addReminder}>Add Reminder</button>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
  );
}

export default Reminders