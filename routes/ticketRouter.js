const express = require('express');
const router = express.Router()
const ticketController = require('../controller/ticketController')
const authController = require('../controller/authController')
router.post('/add',authController.middleware,ticketController.addTicket)
router.put('/update',authController.middleware,ticketController.updateTicket)
router.put('/update-status',authController.middleware,ticketController.updateTicketStatus)
router.delete('/delete',authController.middleware,ticketController.deleteTicket)
router.get('/get',ticketController.getTickets)
module.exports =router;