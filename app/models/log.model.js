let mongoose = require('mongoose')
mongoose.connect('mongodb://db/murasame')

let Schema = mongoose.Schema

let LogSchema = new Schema({
  service_id: {
    type: String
  },
  host: {
    type: String
  },
  message: {
    type: String
  },
  timestamp: {
    type: Date
  }
}, {
  capped: 1024
})

module.exports = mongoose.model('Log', LogSchema)