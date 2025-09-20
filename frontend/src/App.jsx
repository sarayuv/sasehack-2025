import React, {useState} from 'react';
import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = (newItem) => {
    if (newItem.trim()) {
      setShoppingList((prevList) => [...prevList, newItem]);
    }
  };

  return (
    <div className="App">
      <h1>Fred's Fridge</h1>
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ShoppingList shoppingList={shoppingList} addItem={addItem} />
      <Reminders />
    </div>
  );
}

export default App;
