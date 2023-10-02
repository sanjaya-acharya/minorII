const express = require('express');
const router = express.Router();

const { addToFav } = require('../controllers/favorites/addToFav')
const { getFavItems } = require('../controllers/favorites/getFavItems')
const { removeFavItem } = require('../controllers/favorites/removeFavItem')

router.post('/addToFav', addToFav)
router.post('/getFavItems', getFavItems)
router.post('/removeFavItem', removeFavItem)

module.exports = router