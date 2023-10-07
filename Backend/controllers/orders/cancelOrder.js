const Orders = require('../../models/Orders');

const cancelOrder = async (req, res) => {
    const { orderID } = req.body;
    try {
        orderItem = await Orders.findById(orderID)

        if (!orderItem) {
            return res.status(200).json({ error: 'Order not found' });
        }

        orderItem.status = 'cancelled';

        orderItem.save();

        res.json({ message: 'Order cancelled!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { cancelOrder };
