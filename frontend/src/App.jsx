import React, {useState, useEffect} from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/api/shopping-list").then((response) => response.json()).then((data) => setItems(data.items));
  }, []);

  const addItem = () => {
    fetch("/api/shopping-list", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({item: newItem}),
    }).then((response) => response.json()).then((data) => setItems(data.items));
    setNewItem("");
  }

  return (
    <div className="App">
      <h1>Fred's Fridge</h1>
      <div className='fridge'>
        <h2>Fridge</h2>
      </div>
      <div className='shopping-list'>
        <h2>Shopping List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Add new item" 
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  )
}

export default App
