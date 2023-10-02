const Cart = require('../../models/Cart');

const removeFromCart = async (req, res) => {
    try {
        const { cartID } = req.body;

        const cartItem = await Cart.findByIdAndRemove(cartID);

        if (!cartItem) {
            return res.status(200).json({ error: 'Cart item not found' });
        }

        res.json({ message: 'Cart item deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeFromCart };
