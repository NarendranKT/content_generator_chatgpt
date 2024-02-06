const express = require('express');
const { geminiAIController } = require('../controllers/openAIController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const checkApiRequestLimit = require('../middlewares/checkApiRequestLimit');
const router = express.Router();


router.post('/generate-content', isAuthenticated, checkApiRequestLimit, geminiAIController);

module.exports = router;