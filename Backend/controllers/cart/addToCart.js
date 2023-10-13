const Cart = require('../../models/Cart');

const addToCart = async (req, res) => {
    try {
        const { userID, itemID } = req.body;
        const quantity = 1;
        const cartItem = await Cart.findOne({ userID, itemID })

        if (cartItem) {
            return res.json({ message: "Item already exists in cart" })
        }

        const newCartItem = new Cart({
            userID,
            itemID,
            quantity
        });

        await newCartItem.save();

        res.json({
            message: 'Item added to cart!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' + error });
    }
};

module.exports = { addToCart };
