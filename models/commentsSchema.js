const mongoose = require('mongoose')

 const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    }
 })

 module.exports = mongoose.model('Comment',commentSchema)