const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/register', authController.showRegister)
router.post('/register', authController.register)
router.get('/logout', checkAuth, authController.logout)

module.exports = router