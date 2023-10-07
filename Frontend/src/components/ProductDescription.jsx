import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProductDescription.css";

const ProductDescription = () => {
    const { itemID } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = () => {
          axios
            .post('http://localhost:4000/api/items/getItem', {
              itemID: itemID
            })
            .then(response => {
              setProduct(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        };
      
        fetchProduct();
      }, [itemID]);
      
    const addToCart = () => {
        console.log('Product added to cart');
        // You might want to implement actual functionality to add to the cart here
    };

    const addToFavorites = () => {
        console.log('Product added to favorites');
        // You might want to implement actual functionality to add to favorites here
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.itemName}</h2>
            <img
                src={`http://localhost:4000/uploads/${product.itemImage}`}
                alt={`Image for ${product.itemName}`}
            />
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Description: {product.description}</p>
            <p>Availability: {product.availability ? 'Available' : 'Not Available'}</p>
            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={addToFavorites}>Add to Favorites</button>
        </div>
    );
};

export default ProductDescription;
