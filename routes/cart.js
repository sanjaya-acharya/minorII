const express = require('express')
const router = express.Router()

const { addToCart } = require('../controllers/cart/addToCart')
const { getCartItems } = require('../controllers/cart/getCartItems')
const { removeFromCart } = require('../controllers/cart/removeFromCart')

router.post('/addToCart', addToCart)
router.post('/getCartItems', getCartItems)
router.post('/removeFromCart', removeFromCart)

module.exports = router