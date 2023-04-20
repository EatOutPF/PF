const mongoose = require('mongoose')
const { Schema } = mongoose


const notificationSchema = new Schema({
message : {
    type: String
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  unread: {
    type: Boolean,
    default: true
  }
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification