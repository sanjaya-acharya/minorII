const express = require('express')
const router = express.Router()

const { addPromotion } = require('../controllers/promotions/addPromotion')
const { getPromotions } = require('../controllers/promotions/getPromotions')
const { removePromotions } = require('../controllers/promotions/removePromotions')
const { updatePromotion } = require('../controllers/promotions/updatePromotion')

router.post('/addPromotion', addPromotion)
router.post('/getPromotions', getPromotions)
router.post('/removePromotions', removePromotions)
router.post('/updatePromotion', updatePromotion)

module.exports = router