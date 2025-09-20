import React, { useState } from 'react';
import '../styles/ShoppingList.css';

const ShoppingList = ({ shoppingList, addItem, isModalOpen, setIsModalOpen, toggleCrossItem }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      addItem(newItem);
      setNewItem('');
    }
  };

  return (
    <div className="main-shopping-list" style={{ position: 'absolute', left: '320px', top: '80px' }}>
      <h2>Shopping List</h2>
      <div>
        {shoppingList.map(item => (
          <div key={item.id}>
            <span
              className={item.crossedOut ? 'shopping-crossed' : ''}
              onClick={() => toggleCrossItem(item.id)}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
      <button className="open-shopping-list-button" onClick={() => setIsModalOpen(true)}>
        Open
      </button>

      {isModalOpen && (
        <div className="shopping-modal">
          <div className="shopping-modal-content">
            <button className="shopping-close-button" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Shopping List</h2>
            <div className="shopping-input-section">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item..."
                className="shopping-input"
              />
              <button onClick={handleAddItem} className="shopping-button">Add</button>
            </div>
            <div className="shopping-list">
              {shoppingList.map(item => (
                <div key={item.id} className="shopping-item">
                  <span
                    className={item.crossedOut ? 'shopping-crossed' : ''}
                    onClick={() => toggleCrossItem(item.id)}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
