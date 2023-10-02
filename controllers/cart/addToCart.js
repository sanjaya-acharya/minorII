const Cart = require('../../models/Cart');

const addToCart = async (req, res) => {
    try {
        const { userID, itemID } = req.body;

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
