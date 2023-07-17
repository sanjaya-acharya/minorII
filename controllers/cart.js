const Cart = require('../models/Cart');

// Create a new cart item
const addToCart = (req, res) => {
    const { userID, itemID, itemQuantity } = req.body;

    const newCartItem = new Cart({
        userID: userID,
        itemID: itemID,
        itemQuantity: itemQuantity
    });

    newCartItem.save()
        .then((cartItem) => {
            res.json({
                message: 'Item added to cart!',
                cartItem: cartItem
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Read all cart items for a specific user
const getCartItems = (req, res) => {
    const userID = req.params.userID;

    Cart.find({ userID: userID })
        .then(cartItems => {
            res.json(cartItems);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Update a cart item
const updateCartItem = (req, res) => {
    const cartItemID = req.params.cartItemID;
    const { itemQuantity } = req.body;

    Cart.findById(cartItemID)
        .then(cartItem => {
            if (!cartItem) {
                return res.status(404).json({ error: 'Cart item not found' });
            }

            // Update the item quantity if provided in the request body
            if (itemQuantity) {
                cartItem.itemQuantity = itemQuantity;
            }

            // Save the updated cart item
            cartItem.save()
                .then(updatedCartItem => {
                    res.json({
                        message: 'Cart item updated!',
                        cartItem: updatedCartItem
                    });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Delete a cart item
const deleteCartItem = (req, res) => {
    const cartItemID = req.params.cartItemID;

    Cart.findByIdAndRemove(cartItemID)
        .then(cartItem => {
            if (!cartItem) {
                return res.status(200).json({ error: 'Cart item not found' });
            }

            res.json({ message: 'Cart item deleted!' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };
