var express = require('express')
var router = express.Router()
var Service = require('../../../models/service.model')

router.get('/', function(req, res, next) {
  Service.find({}).exec()
  .then((services) => {
    res.send(services)
  }, (err) => {
    res.send(err)
  })

})

router.post('/', function(req, res, next) {
  let service = new Service({
    id: req.body.id,
    name: req.body.name
  })

  service.save((err) => {
    let body = {
      status: !err
    }
    res.send(body)
  })

})

module.exports = router