var mongoose = require('mongoose');
mongoose.connect('mongodb://db/murasame');

var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model('Service', ServiceSchema);