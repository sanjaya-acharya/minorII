const express = require('express')
const router = express.Router()

const { addToCart } = require('../controllers/cart/addToCart')
const { getCartItems } = require('../controllers/cart/getCartItems')
const { removeFromCart } = require('../controllers/cart/removeFromCart')

const { authenticateUser } = require("../controllers/account/login");

router.post('/addToCart', authenticateUser, addToCart)
router.post('/getCartItems', authenticateUser, getCartItems)
router.post('/removeFromCart', authenticateUser, removeFromCart)

module.exports = router;
