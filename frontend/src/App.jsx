import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = (newItem) => {
    if (newItem.trim()) {
      setShoppingList((prevList) => [...prevList, newItem]);
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
      <Reminders />

      <div style={{ height:'210vh'}}></div>
    </div>
  );
}

export default App;
