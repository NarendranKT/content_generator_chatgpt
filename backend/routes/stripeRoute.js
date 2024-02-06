const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const {stripePayment, handleFreeSubscription, verifyPayment} = require('../controllers/stripePayment');
const router = express.Router(); 

router.post('/checkout', isAuthenticated, stripePayment);
router.post('/free-plan', isAuthenticated, handleFreeSubscription);
router.post('/verify-payment/:sessionId', isAuthenticated, verifyPayment);

module.exports = router;    