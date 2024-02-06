const express = require('express');
const { userRegistration, userLogin, userLogout, userProfile, checkAuth } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

// >POST : User Registration
router.post('/register', userRegistration);

// >POST : User Login
router.post('/login', userLogin);

// >POST : User Logout
router.post('/logout', userLogout)

// >GET : User Profile
router.get('/profile', isAuthenticated, userProfile)

// >GET : User CheckAuth
router.get('/auth/check', isAuthenticated, checkAuth);



module.exports = router;