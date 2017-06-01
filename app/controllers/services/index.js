var express = require('express')
var router = express.Router()
var Service = require('../../models/service.model')

router.get('/', function(req, res, next) {
  Service.find({}).exec()
  .then((services) => {
    res.send(services)
  }, (err) => {
    res.send(err)
  })

})

router.post('/', function(req, res, next) {
  let service = new Service({id: "hoge", name: "name"})
  service.save((err) => {
    console.log(err)
  })
  res.send({})
})

module.exports = router