let express = require('express')
let router = express.Router()
let Log = require('../../../models/log.model')

router.get('/:service_id', function(req, res, next) {
  Log.find({service_id: req.params.service_id}).exec()
    .then((services) => {
      res.send(services)
    }, (err) => {
      res.send(err)
    })

})
module.exports = router