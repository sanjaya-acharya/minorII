const express = require('express')
const router = express.Router()

const { getRating } = require('../controllers/ratings/getRating')
const { giveRating } = require('../controllers/ratings/giveRating')
const { removeRating } = require('../controllers/ratings/removeRating')

router.post('/getRating', getRating)
router.post('/giveRating', giveRating)
router.post('/removeRating', removeRating)

module.exports = router