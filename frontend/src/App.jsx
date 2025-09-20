import React, {useState, useEffect} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import Notes from './components/Notes';
import './App.css';

function App() {
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
        const updated = [...prev, { id: Date.now() + Math.random(), text, color }];
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
    localStorage.setItem('shoppingList', JSON.stringify([]));
    localStorage.setItem('reminders', JSON.stringify([]));
    localStorage.setItem('notes', JSON.stringify([]));
  };

  return (
    <div className="App">
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
      <div style={{ height:'210vh'}}></div>
    </div>
  );
}

export default App;