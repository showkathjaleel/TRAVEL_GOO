const router = require('express').Router()
// const { authenticateToken } = require('../middleware')
const { userRegister, userLogin, forgotPassword, googleSignIn, otpLogin } = require('../controller/authController')

// register
router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/forgotpassword', forgotPassword)

router.post('/googlesignin', googleSignIn)

router.post('/otplogin', otpLogin )

module.exports = router
