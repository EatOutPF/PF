const mongoose = require('mongoose')
const { Schema } = mongoose


const notificationSchema = new Schema({
message : {
    type: String
},
user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification