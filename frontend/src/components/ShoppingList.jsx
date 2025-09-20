import React, {useState, useEffect} from 'react';
import '../styles/ShoppingList.css';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  }

  return (
      <div className='shopping-list'>
        <button onClick={() => setIsModalOpen(true)}>Open Shopping List</button>

        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
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
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
  );
}

export default ShoppingList
