import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import Notes from './components/Notes'; 
import './App.css';
import ReminderList from './components/Reminders';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className='main-shopping-list'>
        <h2>Shopping List</h2>
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className='open-shopping-list-button' onClick={() => setIsModalOpen(true)}>Open Shopping List</button>
      </div>
      <ShoppingList shoppingList={shoppingList} addItem={addItem} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ul>
        {reminderList.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
      <ReminderList reminderList={reminderList} addReminder={addReminder} />
      
      <div className="notes-section">
        <h2>Sticky Notes</h2>
        <Notes />
      </div>

      <div style={{ height:'210vh'}}></div>
    </div>
  );
}

export default App;