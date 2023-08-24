var express = require('express');
var router = express.Router();
const flightCtrl = require("../controllers/flights");
const destinationCtrl = require('../controllers/destinations');

/* GET users listing. */
router.get("/", flightCtrl.index);

router.get("/new", flightCtrl.new);

router.get('/:id', flightCtrl.show);

router.post("/", flightCtrl.create);

router.post("/:id", destinationCtrl.create);

module.exports = router;