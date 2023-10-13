import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDescription.css';

const ProductDescription = () => {
    const navigate = useNavigate();
    const { itemID } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newStar, setNewStar] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/items/getItem', {
                    itemID: itemID,
                });
                setProduct(response.data);

                const reviewsResponse = await axios.post('http://localhost:4000/api/ratings/getRating', {
                    itemID: itemID,
                });
                setReviews(reviewsResponse.data);

                const userID = sessionStorage.getItem('userID');
                if (userID) {
                    const isFavoriteResponse = await axios.post("http://localhost:4000/api/favorites/isFavorite", { userID, itemID: itemID });
                    setIsFavorite(isFavoriteResponse.data.isFavorite);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [itemID]);

    const addToCart = () => {
        const userID = sessionStorage.getItem('userID');

        if (!userID) {
            navigate('/login');
            return;
        }

        axios.post("http://localhost:4000/api/cart/addtocart", { userID, itemID: itemID })
            .then(response => {
                console.log(response.data.message);
                navigate("/cart")
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
    };

    const addToFavorites = () => {
        const userID = sessionStorage.getItem('userID');

        if (!userID) {
            navigate('/login')
            return;
        }

        const endpoint = isFavorite ? "removeFavItem" : "addToFav";

        axios.post(`http://localhost:4000/api/favorites/${endpoint}`, { userID, itemID: itemID })
            .then(response => {
                console.log(response.data.message);
                setIsFavorite(!isFavorite);
            })
            .catch(error => {
                console.error(`Error ${isFavorite ? 'removing from' : 'adding to'} favorites:`, error);
            });
    };

    const submitReview = async () => {
        try {
            const userID = sessionStorage.getItem('userID');

            if (!userID) {
                navigate('/login')
                return;
            }

            await axios.post('http://localhost:4000/api/ratings/giveRating', {
                itemID: itemID,
                star: newStar,
                message: newMessage,
                userID: userID,
            });

            setNewStar("");
            setNewMessage("");
            window.location.reload();
        

            const reviewsResponse = await axios.post('http://localhost:4000/api/ratings/getRating', {
                itemID: itemID,
            });
            setReviews(reviewsResponse.data);

            setNewStar(0);
            setNewMessage('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleStarClick = (index) => {
        setNewStar(index + 1);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-description-container">
            <div className="product-details">
                <h2 className="product-title">{product.itemName}</h2>
                <img
                    className="product-image"
                    src={`http://localhost:4000/uploads/${product.itemImage}`}
                    alt={`Image for ${product.itemName}`}
                />
                <p className="product-info">Price: ${product.price}</p>
                <p className="product-info">Rating: {product.rating}</p>
                <p className="product-info">Description: {product.description}</p>
                <div className="flex-btns">
                    <button className="action-button-primary" onClick={addToCart}>Add to Cart</button>
                    <button
                        className="action-button-primary"
                        onClick={addToFavorites}
                    >
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>

            <div className="reviews-container">
                <h3 className="review-title">Reviews</h3>
                <div className="add-review-box">
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < newStar ? 'golden' : 'white'}
                                onClick={() => handleStarClick(index)}
                            >
                                {index < newStar ? "★" : "☆"}
                            </span>
                        ))}
                    </div>
                    <textarea
                        className="new-review-message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write your review..."
                    />
                    <button className="action-button-success" onClick={submitReview}>Submit Review</button>
                </div>
                <ul className="review-list">
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <li key={review.reviewID}>
                                <p className="review-info">Star: {review.star}</p>
                                <p className="review-info">Message: {review.message}</p>
                            </li>
                        ))
                    ) : (
                        <li></li>
                    )}
                </ul>

            </div>
        </div>
    );
};

export default ProductDescription;
