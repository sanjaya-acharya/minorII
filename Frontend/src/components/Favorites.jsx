import '../styles/Products.css';
import FavoriteBox from './FavoriteBox';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:4000/api/favorites/getFavItems", {userID: sessionStorage.getItem("userID")})
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="ProductsContainer">
            {products.length === 0 ? (
                <div>No products available</div>
            ) : (
                products.map(item => (
                    <FavoriteBox key={item._id} item={item} />
                ))
            )}
        </div>
    );
};

export default Favorites;
