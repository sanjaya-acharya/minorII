// Favorites.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteBox from './FavoriteBox';
import '../styles/Favorites.css';

const Favorites = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        if (userID) {
            axios.post('http://localhost:4000/api/favorites/getFavItems', { userID })
                .then(response => {
                    setFavoriteItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching favorite items:', error);
                });
        }
    }, []);

    return (
        <div className="FavoritesContainer">
            {favoriteItems.length === 0 ? (
                <div>No favorite items available</div>
            ) : (
                favoriteItems.map(item => (
                    <FavoriteBox key={item._id} item={item} />
                ))
            )}
        </div>
    );
};

export default Favorites;
