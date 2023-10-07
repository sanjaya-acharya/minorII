const Cart = require('../../models/Cart');

const addToCart = async (req, res) => {
    try {
        const { userID, itemID } = req.body;

        const cartItem = await Cart.findOne({userID, itemID})

        if (cartItem) {
            return res.json({message: "Item already exists in cart"})
        }

        const newCartItem = new Cart({
            userID: userID,
            itemID: itemID
        });

        await newCartItem.save();

        res.json({
            message: 'Item added to cart!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addToCart };
