// FavoriteBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteBox = ({ item }) => {
    const navigate = useNavigate();

    const handleProductBoxClick = () => {
        navigate(`/productDescription/${item._id}`);
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
            <p className="ProductInfo">Rs. 130</p>
            <p className="ProductInfo">⭐ 4</p>
            <div className="ProductButtons">
                <button className="cart-btn" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default FavoriteBox;
