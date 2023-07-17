const express = require('express')
const router = express.Router()

const account = require('../controllers/account')

router.post('/register', account.register)
router.post('/login', account.login)
router.post('/loadinfo', account.loadInfo)
router.post('/deleteuser', account.deleteUser)
router.post('/changepassword', account.changePassword)

module.exports = router