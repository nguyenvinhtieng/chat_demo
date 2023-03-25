const express = require('express');
const router = express.Router()
const MainController = require('../app/controllers/MainController.js');

router.post('/login', MainController.Login)
router.post('/send-message', MainController.sendMessage)
router.post('/get-all-chat-thread', MainController.getAllChatThread)
router.post('/get-chat-content', MainController.getChatContent)
router.post('/find', MainController.getUser)
module.exports = router;
