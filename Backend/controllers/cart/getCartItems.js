const Cart = require('../../models/Cart');
const Items = require('../../models/Items'); // Import the Items model

const getCartItems = async (req, res) => {
    try {
        const { userID } = req.body;

        const cartItems = await Cart.find({ userID: userID });

        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({ message: 'No items in the cart' });
        }

        const transformedCartItems = await Promise.all(
            cartItems.map(async (cartItem) => {
                const item = await Items.findById(cartItem.itemID);

                const separateID = (obj) => {
                    const { ['_id']: _, ...rest } = obj;
                    return rest;
                };

                return {
                    _id: cartItem._id,
                    itemID: item._id,
                    ...separateID(item.toObject())
                };
            })
        );

        res.json(transformedCartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getCartItems };
