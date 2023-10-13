import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Send the POST request using axios
    axios.post('http://localhost:4000/api/menu/getItems')
      .then(response => {
        // Handle the response data
        setItems(response.data); // Store the data in the state
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item._id}>
          <img src={require(`../uploads/${item.imageURL}`)} alt={item.itemName} />
          <h3>{item.itemName}</h3>
          <p>Price: {item.price}</p>
          <p>Rating: {item.ratingsCount==0?0:item.ratingsSum/item.ratingsCount}</p>
          {/* You can add more elements to display other information */}
        </div>
      ))}
    </div>
  );
}