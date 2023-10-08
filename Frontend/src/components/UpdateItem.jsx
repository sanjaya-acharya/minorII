import React, { useState } from 'react';
import axios from 'axios';

const UpdateItem = () => {
  const [itemId, setItemId] = useState('');
  const [newItemName, setNewItemName] = useState('');

  const handleUpdateItem = () => {
    // Update item details on the server
    axios.post("http://localhost:4000/items/updateItem", { itemId, newItemName })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
      <h2>Update Item</h2>
      <input type="text" placeholder="Item ID" value={itemId} onChange={(e) => setItemId(e.target.value)} />
      <input type="text" placeholder="New Item Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
      <button onClick={handleUpdateItem}>Update Item</button>
    </div>
  );
};

export default UpdateItem;
