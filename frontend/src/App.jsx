import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';
import ReminderList from './components/Reminders';

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = (newItem) => {
    if (newItem.trim()) {
      setShoppingList((prevList) => [...prevList, newItem]);
    }
  };

  const [reminderList, setReminderList] = useState([]);

  const addReminder = (newReminder) => {
    if (newReminder.trim()) {
      setReminderList((prevList) => [...prevList, newReminder]);
    }
  };

  return (
    <div className="App">
      <h1>Fred's Fridge</h1>
      <ShoppingList />
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ShoppingList shoppingList={shoppingList} addItem={addItem} />
      <ReminderList />
      <ul>
        {reminderList.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
      <ReminderList reminderList={reminderList} addReminder={addReminder} />
    </div>
  );
}

export default App;
