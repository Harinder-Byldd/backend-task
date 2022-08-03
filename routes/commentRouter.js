const express = require('express')
const commentController = require('../controller/commentController')
const router = express.Router()

router.post('/add',commentController.addComment)
router.delete('/delete',commentController.deleteComment)

module.exports = router;