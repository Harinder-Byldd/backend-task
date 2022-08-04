const express = require('express')
const commentController = require('../controller/commentController')
const router = express.Router()
const authController = require("../controller/authController")
router.post('/add',authController.middleware,commentController.addComment)
router.delete('/delete',authController.middleware,commentController.deleteComment)

module.exports = router;