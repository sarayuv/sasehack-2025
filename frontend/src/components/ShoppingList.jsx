import React, {useState, useEffect} from 'react';
import '../styles/ShoppingList.css';

function ShoppingList({shoppingList, addItem}) {
  const [newItem, setNewItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = () => {
    addItem(newItem);
    setNewItem("");
    setIsModalOpen(false);
  }

  return (
      <div className='shopping-list'>
        <button onClick={() => setIsModalOpen(true)}>Open Shopping List</button>

        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <button className='close-button' onClick={() => setIsModalOpen(false)}>X</button>
              <h2>Shopping List</h2>
              <ul>
                {shoppingList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <input 
                type="text" 
                value={newItem} 
                onChange={(e) => setNewItem(e.target.value)} 
                placeholder="Add new item" 
              />
              <button onClick={handleAddItem}>Add Item</button>
            </div>
          </div>
        )}
      </div>
  );
}

export default ShoppingList
