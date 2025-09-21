import React, {useState, useEffect} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import Notes from './components/Notes';
import Photos from './components/Photos';
import Calendar from './components/Calendar';
import Select from 'react-select';
import './App.css';

function App() {
  // Users
  const users = [
    {name: 'Fred', color: '#FFB6C1'},
    {name: 'Susan', color: '#87CEEB'},
    {name: 'Rachael', color: '#98FB98'},
    {name: 'Jack', color: '#FFD700'},
    {name: 'Margaret', color: '#DDA0DD'}
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
      <div style={{ position: 'fixed', top: 40, left: 60, zIndex: 2000, minWidth: 180 }}>
        <Select
          classNamePrefix="user-dropdown"
          value={{ value: currentUser, label: currentUser, color: users.find(u => u.name === currentUser)?.color }}
          onChange={option => setCurrentUser(option.value)}
          options={users.map(user => ({value: user.name, label: user.name, color: user.color}))}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? state.data.color
                : state.isFocused
                ? state.data.color + '55'
                : 'white',
              color: 'black',
              fontWeight: state.isSelected ? 'bold' : 'normal',
              cursor: 'pointer',
            }),
            singleValue: (provided, state) => ({
              ...provided,
              backgroundColor: state.data.color,
              color: 'black',
              padding: '4px 12px',
              borderRadius: '8px',
              fontWeight: 'bold',
            }),
            control: (provided) => ({
              ...provided,
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              border: 'none',
              minWidth: '120px',
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            })
          }}
        />
      </div>

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

      <Photos key={`photo-slot-1-${photoResetKey}`} x={400} y={200} resetKey={photoResetKey} slot={1} />
      <Photos key={`photo-slot-2-${photoResetKey}`} x={400} y={700} resetKey={photoResetKey} slot={2} />
      <Photos key={`photo-slot-3-${photoResetKey}`} x={800} y={370} resetKey={photoResetKey} slot={3} />
      <Photos key={`photo-slot-4-${photoResetKey}`} x={750} y={1000} resetKey={photoResetKey} slot={4} />

      <Calendar events={events} users={users} addEvent={addEvent} />

      <div style={{height:'180vh'}}></div>
    </div>
  );
}

export default App;
