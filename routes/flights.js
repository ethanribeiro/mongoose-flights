var express = require('express');
var router = express.Router();
const flightCtrl = require("../controllers/flights");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
