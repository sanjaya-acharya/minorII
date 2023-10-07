const express = require('express')
const router = express.Router()

const { register } = require('../controllers/account/register')
const { login } = require('../controllers/account/login')
const { loadInfo } = require('../controllers/account/loadInfo')
const { changePassword } = require('../controllers/account/changePassword')
const { updatePassword } = require('../controllers/account/updatePassword')
const { sendOTP } = require('../controllers/account/sendOTP')
const { verifyOTP } = require('../controllers/account/verifyOTP')
const { suspendUser } = require('../controllers/account/suspendUser')
const { removeSuspension } = require('../controllers/account/removeSuspension')

router.post('/register', register)
router.post('/login', login)
router.post('/loadinfo', loadInfo)
router.post('/changepassword', changePassword)
router.post('/updatepassword', updatePassword)
router.post('/sendotp', sendOTP)
router.post('/verifyotp', verifyOTP)
router.post('/suspendUser', suspendUser)
router.post('/removeSuspension', removeSuspension)

module.exports = router