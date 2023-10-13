import '../styles/ProductBox.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FavoriteBox = ({ item }) => {
    console.log(item)
    const navigate = useNavigate();

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

        axios.post("http://localhost:4000/api/cart/addtocart", { userID, itemID: item.itemID })
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
            <p className="ProductInfo">Rs. {item.itemPrice}</p>
            <div className="ProductButtons">
                <button className="cart-btn" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default FavoriteBox;
