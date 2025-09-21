import React, { useState, useEffect } from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import Notes from './components/Notes';
import Photos from './components/Photos';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  // Users
  const users = [
    { name: 'Fred', color: '#FFB6C1' },
    { name: 'Susan', color: '#87CEEB' },
    { name: 'Rachael', color: '#98FB98' },
    { name: 'Jack', color: '#FFD700' },
    { name: 'Margaret', color: '#DDA0DD' }
  ];
  const [currentUser, setCurrentUser] = useState(users[0].name);

  // Photos
  const [photoResetKey, setPhotoResetKey] = useState(0);

  // Shopping Lists
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);

  // Reminders
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);

  // Notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // Calendar
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  // Shopping List Logic
  const addItem = (text) => {
    if (text.trim()) {
      setShoppingList((prev) => {
        const updated = [...prev, { id: Date.now() + Math.random(), text, crossedOut: false }];
        localStorage.setItem('shoppingList', JSON.stringify(updated));
        return updated;
      });
    }
  };
  const toggleCrossItem = (id) => {
    setShoppingList((prev) => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, crossedOut: !item.crossedOut } : item
      );
      localStorage.setItem('shoppingList', JSON.stringify(updated));
      return updated;
    });
  };

  // Reminders Logic
  const addReminder = (text) => {
    if (text.trim()) {
      setReminders((prev) => {
        const updated = [...prev, { id: Date.now() + Math.random(), text, crossedOut: false }];
        localStorage.setItem('reminders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const toggleCrossReminder = (id) => {
    setReminders((prev) => {
      const updated = prev.map(reminder =>
        reminder.id === id ? { ...reminder, crossedOut: !reminder.crossedOut } : reminder
      );
      localStorage.setItem('reminders', JSON.stringify(updated));
      return updated;
    });
  };

  // Notes Logic
  const addNote = (text, color) => {
    if (text.trim()) {
      setNotes((prev) => {
        const updated = [...prev, {id: Date.now() + Math.random(), text, color, user: currentUser}];
        localStorage.setItem('notes', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => {
      const updated = prev.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(updated));
      return updated;
    });
  };

  // Clear Fridge Logic
  const clearFridge = () => {
    setShoppingList([]);
    setReminders([]);
    setNotes([]);
    setEvents([]);
    localStorage.setItem('shoppingList', JSON.stringify([]));
    localStorage.setItem('reminders', JSON.stringify([]));
    localStorage.setItem('notes', JSON.stringify([]));
    localStorage.setItem('events', JSON.stringify([]));
    setPhotoResetKey(prev => prev + 1);
    for (let i = 1; i <= 4; i++) {
      localStorage.removeItem(`fridgePhoto-${i}`);
    }
  };

  // Calendar Logic
  const addEvent = (title, date, user) => {
    if (title && date && user) {
      setEvents(prev => {
        const updated = [...prev, { id: Date.now() + Math.random(), title, date, user }];
        localStorage.setItem('events', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="App">
      <select className="user-dropdown" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
        {users.map(user => (
          <option key={user.name} value={user.name}>{user.name}</option>
        ))}
      </select>

      <button 
        className="clear-fridge-button" 
        style={{position: 'fixed', top: '70px', right: '60px', zIndex: 2000}}
        onClick={clearFridge}
      >
        Clear Fridge
      </button>

      <ShoppingList
        shoppingList={shoppingList}
        addItem={addItem}
        isShoppingModalOpen={isShoppingModalOpen}
        setIsShoppingModalOpen={setIsShoppingModalOpen}
        toggleCrossItem={toggleCrossItem}
      />

      <Reminders
        reminders={reminders}
        addReminder={addReminder}
        isRemindersModalOpen={isRemindersModalOpen}
        setIsRemindersModalOpen={setIsRemindersModalOpen}
        toggleCrossReminder={toggleCrossReminder}
      />
      
      <Notes
        notes={notes}
        addNote={addNote}
        deleteNote={deleteNote}
        isNotesModalOpen={isNotesModalOpen}
        setIsNotesModalOpen={setIsNotesModalOpen}
      />

      <Photos key={`photo1-${photoResetKey}`} x={450} y={200} resetKey={photoResetKey} slot={1} />
      <Photos key={`photo2-${photoResetKey}`} x={450} y={600} resetKey={photoResetKey} slot={2} />
      <Photos key={`photo3-${photoResetKey}`} x={800} y={400} resetKey={photoResetKey} slot={3} />
      <Photos key={`photo4-${photoResetKey}`} x={800} y={1100} resetKey={photoResetKey} slot={4} />

      <Calendar events={events} users={users} addEvent={addEvent} />

      <div style={{height:'200vh'}}></div>
    </div>
  );
}

export default App;
