const Orders = require('../../models/Orders');

const makeOrder = async (req, res) => {
    const { userID, cartItems, totalAmount, expectedTime } = req.body;
    try {
        const newOrderItem = new Orders({
            user: userID,
            cartItems: cartItems,
            totalAmount: totalAmount,
            orderDate: Date.now(),
            expectedTime: expectedTime
        });

        await newOrderItem.save();

        res.json({
            message: 'Order made successfully!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { makeOrder };
