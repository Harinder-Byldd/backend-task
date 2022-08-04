const Comment= require('../models/commentsSchema')
const Ticket = require('../models/TicketSchema')

exports.addComment = async(req,res)=>{
    try {
        if(req.user){
            const {id} = req.user
            const {postId,comment} = req.body;
            const dbComment =  await Comment.create({
             commentBy:id,postId,comment
            })
            await Ticket.findByIdAndUpdate(postId,{$push:{comments:dbComment.id}})
            res.json(dbComment)
        }else{
            throw new Error('User not Authorised')
        }
       
    } catch (error) {
        throw new Error(error)
    }
}



exports.deleteComment=async(req,res)=>{
    try {
        if(req.user){
            const {id,postId} = req.body
            await Ticket.findByIdAndUpdate(postId,{$pull:{
                comments:id
            }})
            await Comment.findByIdAndDelete(id)
            res.json(true)
        }
        
    } catch (error) {
        throw new Error(error)
    }
}