const express = require('express');
const router = express.Router();

const { addToFav } = require('../controllers/favorites/addToFav')
const { isFavorite, getFavItems } = require('../controllers/favorites/getFavItems')
const { removeFavItem } = require('../controllers/favorites/removeFavItem')

router.post('/addToFav', addToFav)
router.post('/getFavItems', getFavItems)
router.post('/removeFavItem', removeFavItem)
router.post('/isFavorite', isFavorite)

module.exports = router