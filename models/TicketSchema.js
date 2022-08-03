const mongoose = require('mongoose');
const Comment = require('./commentsSchema')
const TicketSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['open','in progress','closed']
    },
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:Comment}]
},{
    timestamps: {
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    }
  })

module.exports = mongoose.model('Ticket',TicketSchema)