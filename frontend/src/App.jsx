import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';

function App() {
  // Shopping Lists
  const [shoppingList, setShoppingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reminders
  const [reminders, setReminders] = useState([]);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);

  // Shopping List Logic
  const addItem = (text) => {
    if (text.trim()) {
      setShoppingList((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), text, crossedOut: false }
      ]);
    }
  };
  const toggleCrossItem = (id) => {
    setShoppingList((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, crossedOut: !item.crossedOut } : item
      )
    );
  };

  // Reminders Logic
  const addReminder = (text) => {
    if (text.trim()) {
      setReminders((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), text, crossedOut: false }
      ]);
    }
  };
  const toggleCrossReminder = (id) => {
    setReminders((prev) =>
      prev.map(reminder =>
        reminder.id === id ? { ...reminder, crossedOut: !reminder.crossedOut } : reminder
      )
    );
  };

  return (
    <div className="App">
      <ShoppingList
        shoppingList={shoppingList}
        addItem={addItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        toggleCrossItem={toggleCrossItem}
      />
      <Reminders
        reminders={reminders}
        addReminder={addReminder}
        isRemindersModalOpen={isRemindersModalOpen}
        setIsRemindersModalOpen={setIsRemindersModalOpen}
        toggleCrossReminder={toggleCrossReminder}
      />
      <div style={{ height:'210vh'}}></div>
    </div>
  );
}

export default App;