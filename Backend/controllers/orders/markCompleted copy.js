const Orders = require('../../models/Orders');

const markCompleted = async (req, res) => {
    const { userID, cartItems, totalAmount } = req.body;
    try {
        const newOrderItem = new Orders({
            userID: userID,
            cartItems: cartItems,
            totalAmount: totalAmount,
            orderDate: Date.now(),
            expectedTime: Date.now()
        });

        await newOrderItem.save();

        res.json({
            message: 'Order made successfully!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { markCompleted };
