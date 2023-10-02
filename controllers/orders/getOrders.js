const Orders = require('../../models/Orders'); // Import the Orders model

const getOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const orderItem = await Orders.findOne({ orderId: orderId });

        if (!orderItem) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        // Find all orders, excluding canceled orders
        const orderItems = await Orders.find({ status: { $ne: 'canceled' } })
            .sort({ expectedTime: 1 }); // Sort by expectedTime in ascending order

        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOrder, getAllOrders };
