import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all items from the server
    axios.post("http://localhost:4000/items/getallitems", {})
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.itemName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
