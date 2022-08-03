const Ticket= require('../models/TicketSchema')

exports.addTicket = async(req,res)=>{
    try {
       const {title,description} = req.body;
      const ticket =  await Ticket.create({
        title,description,status:'open'
       })
       res.json(ticket)
    } catch (error) {
        throw new Error(error)
    }
}
exports.getTickets = async(req,res)=>{
    try {
        const tickets = await Ticket.find({}).populate({ path: 'comments', model: 'Comment' })
        res.json(tickets)
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateTicketStatus=async(req,res)=>{
    try {
        const {id,status} = req.body
        await Ticket.findOneAndUpdate(id,{status})
        res.json(true)
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateTicket=async(req,res)=>{
    try {
        const {id,ticket} = req.body
        await Ticket.findByIdAndUpdate(id,{title:ticket.title,description:ticket.description})
        res.json(true)
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteTicket=async(req,res)=>{
    try {
        const {id} = req.body
        await Ticket.findByIdAndDelete(id)
        res.json(true)
    } catch (error) {
        throw new Error(error)
    }
}