import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';
import ReminderList from './components/Reminders';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crossedItems, setCrossedItems] = useState({});
  const [reminderList, setReminderList] = useState([]);

  const addItem = (newItem) => {
    if (newItem.trim()) {
      setShoppingList((prevList) => [...prevList, newItem]);
    }
  };

  const toggleCrossItem = (index) => {
    setCrossedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addReminder = (newReminder) => {
    if (newReminder.trim()) {
      setReminderList((prevList) => [...prevList, newReminder]);
    }
  };

  return (
    <div className="App">
      <div className='main-shopping-list' 
        style={{
          position: 'absolute',
          top: '120px',
          left: '320px',
        }}
      >
        <h2>Shopping List</h2>
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index} className={crossedItems[index] ? "crossed" : ""} onClick={() => toggleCrossItem(index)}>{item}</li>
          ))}
        </ul>
        <button className='open-shopping-list-button' onClick={() => setIsModalOpen(true)}>Open</button>
      </div>
      <ShoppingList shoppingList={shoppingList} addItem={addItem} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} crossedItems={crossedItems} toggleCrossItem={toggleCrossItem} />
      <ul>
        {reminderList.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
      <ReminderList reminderList={reminderList} addReminder={addReminder} />

      <div style={{ height:'210vh'}}></div>
    </div>
  );
}

export default App;