import '../styles/ProductBox.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductBox = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        if (userID) {
            axios.post("http://localhost:4000/api/favorites/isFavorite", { userID, itemID: item._id })
                .then(response => {
                    setIsFavorite(response.data.isFavorite);
                });
        }
    }, [item._id])

    const handleFavoriteClick = () => {
        const userID = sessionStorage.getItem('userID');

        if (!userID) {
            navigate('/login');
            return;
        }

        if (isFavorite) {
            axios.post("http://localhost:4000/api/favorites/removeFavItem", { userID, itemID: item._id })
                .then(response => {
                    console.log(response.data.message)
                    setIsFavorite(false);
                })
        } else {
            axios.post("http://localhost:4000/api/favorites/addToFav", { userID, itemID: item._id })
                .then(response => {
                    console.log(response.data.message)
                    setIsFavorite(true);
                })
        }
    };

    const handleProductBoxClick = (event) => {
        if (event.target.tagName.toLowerCase() !== 'button') {
            navigate(`/productDescription/${item._id}`);
        }
    };

    const addToCart = () => {
        const userID = sessionStorage.getItem('userID');

        if (!userID) {
            navigate('/login');
            return;
        }

        axios.post("http://localhost:4000/api/cart/addtocart", { userID, itemID: item._id })
            .then(
                response => {
                    console.log(response.data.message);
                    navigate('/cart');
                }
            )
    };

    return (
        <div className="ProductBox" onClick={handleProductBoxClick}>
            {item.itemImage && (
                <img
                    className="ProductImage"
                    src={`http://localhost:4000/uploads/${item.itemImage}`}
                    alt={`Image for ${item.itemName}`}
                />
            )}
            <p className="ProductInfo">{item.itemName}</p>
            <p className="ProductInfo">${item.price}</p>
            <p className="ProductInfo">Rating: {item.rating}</p>
            <div className="ProductButtons">
                <button onClick={addToCart}>Cart</button>
                <button
                    className="FavButton"
                    onClick={handleFavoriteClick}
                    style={{ fontWeight: isFavorite ? 'bold' : 'normal' }}
                >
                    Fav
                </button>
            </div>
        </div>
    );
};

export default ProductBox;
