import React, { useState, useEffect } from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import Notes from './components/Notes';
import Photos from './components/Photos';
import './App.css';

function App() {
  // Users
  const users = ['Sarayu', 'Abhi', 'Sriram', 'Sita', 'Shiva'];
  const [currentUser, setCurrentUser] = useState("");

  // Reset key for Photos
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
    setPhotoResetKey(prev => prev + 1); // reset all Photos
    localStorage.setItem('shoppingList', JSON.stringify([]));
    localStorage.setItem('reminders', JSON.stringify([]));
    localStorage.setItem('notes', JSON.stringify([]));
  };

  return (
    <div className="App">
      <select className="user-dropdown" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
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

      {/* Photos positioned at your previous coordinates */}
      <Photos key={`photo1-${photoResetKey}`} x={500} y={450} resetKey={photoResetKey} />
      <Photos key={`photo2-${photoResetKey}`} x={500} y={800} resetKey={photoResetKey} />
      <Photos key={`photo3-${photoResetKey}`} x={200} y={300} resetKey={photoResetKey} />
      <Photos key={`photo4-${photoResetKey}`} x={200} y={300} resetKey={photoResetKey} />

      <div style={{ height:'200vh'}}></div>
    </div>
  );
}

export default App;
