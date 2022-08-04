const e = require('express');
const Ticket= require('../models/TicketSchema')

exports.addTicket = async(req,res)=>{
    try {
        const user = req.user;
        if(user){
            const {title,description} = req.body;
            const ticket =  await Ticket.create({
              title,description,status:'open',tickedRaisedBy:user.id
             })
             res.json(ticket)
        }else{
            res.status(401).send({error:'User Not Authorised'})
        }
       
    } catch (error) {
        res.status(401).send({error:'User Not Authorised'})
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
        if(req.user){
            const {id,status} = req.body
            await Ticket.findOneAndUpdate(id,{status})
            res.json(true)
        }
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateTicket=async(req,res)=>{
    try {
        if(req.user){
            const {id,ticket} = req.body
            await Ticket.findByIdAndUpdate(id,{title:ticket.title,description:ticket.description})
            res.json(true)
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteTicket=async(req,res)=>{
    try {
        if(req.user){
            const {id} = req.body
            await Ticket.findByIdAndDelete(id)
            res.json(true)
        }
        
    } catch (error) {
        throw new Error(error)
    }
}