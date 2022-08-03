const mongoose = require('mongoose')

 const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    commentBy:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    }
 })

 module.exports = mongoose.model('Comment',commentSchema)