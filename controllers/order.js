const Order = require('../models/Order');

// Create a new order
const createOrder = (req, res) => {
    const { userID, itemID, itemQuantity, orderStatus, tableNumber } = req.body;

    const newOrder = new Order({
        userID: userID,
        itemID: itemID,
        itemQuantity: itemQuantity,
        tableNumber: tableNumber,
        orderStatus: orderStatus
    });

    newOrder.save()
        .then((order) => {
            res.json({
                message: 'Order created!',
                order: order
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Read all orders for a specific user
const getOrdersByUser = (req, res) => {
    const userID = req.params.userID;

    Order.find({ userID: userID })
        .then(orders => {
            res.json(orders);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getAllOrders = (req, res) => {
    Order.find({ userID: userID })
        .then(orders => {
            res.json(orders);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Update an order
const updateOrder = (req, res) => {
    const orderID = req.params.orderID;
    const { orderStatus } = req.body;

    Order.findById(orderID)
        .then(order => {
            if (!order) {
                return res.status(200).json({ error: 'Order not found' });
            }

            // Update the order status if provided in the request body
            if (orderStatus) {
                order.orderStatus = orderStatus;
            }

            // Save the updated order
            order.save()
                .then(updatedOrder => {
                    res.json({
                        message: 'Order updated!',
                        order: updatedOrder
                    });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

// Delete an order
const deleteOrder = (req, res) => {
    const orderID = req.params.orderID;

    Order.findByIdAndRemove(orderID)
        .then(order => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json({ message: 'Order deleted!' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = { createOrder, getOrdersByUser, updateOrder, deleteOrder };
