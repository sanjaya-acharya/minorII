const Orders = require('../../models/Orders'); // Import the Orders model

const getOrder = async (req, res) => {
    const { orderID } = req.body;
    try {
        const orderItem = await Orders.findById(orderID);

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
        const orderItems = await Orders.find({ status: { $nin: ['completed', 'cancelled'] } })
            .sort({ expectedTime: 1 });

        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserOrders = async (req, res) => {
    const { userID } = req.body;

    try {
        const orderItems = await Orders.find({ userID });

        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOrder, getAllOrders, getUserOrders };
