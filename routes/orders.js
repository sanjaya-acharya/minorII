const express = require('express')
const router = express.Router()

const { makeOrder } = require('../controllers/orders/makeOrder')
const { cancelOrder } = require('../controllers/orders/cancelOrder')
const { getOrder, getAllOrders } = require('../controllers/orders/getOrders')

router.post('/makeOrder', makeOrder);
router.post('/cancelOrder', cancelOrder);
router.post('/getOrder', getOrder);
router.post('/getAllOrders', getAllOrders);

module.exports = router