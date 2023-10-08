import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    // Add a new item to the server
    axios.post("http://localhost:4000/items/additem", { itemName })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div>
      <h2>Add Item</h2>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItem;
