const express = require('express');
const router = express.Router()
const ticketController = require('../controller/ticketController')
router.post('/add',ticketController.addTicket)
router.put('/update',ticketController.updateTicket)
router.put('/update-status',ticketController.updateTicketStatus)
router.delete('/delete',ticketController.deleteTicket)
router.get('/get',ticketController.getTickets)
module.exports =router;