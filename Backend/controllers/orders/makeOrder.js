const Orders = require('../../models/Orders');

const makeOrder = async (req, res) => {
    const { emailID, cartItems, totalAmount } = req.body;
    try {
        const newOrderItem = new Orders({
            emailID: emailID,
            cartItems: cartItems,
            totalAmount: totalAmount,
            orderDate: Date.now(),
            expectedTime: Date.now(),
        });

        await newOrderItem.save();

        res.json({
            message: 'Order made successfully!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: \n'+error });
    }
};

module.exports = { makeOrder};
