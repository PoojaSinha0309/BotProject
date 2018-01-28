var express = require('express');
var router = express.Router();
var Botdetail = require('../model/botdetails');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'API Initialized!'});
});

router.post('/', function(req, res, next) {
  var result = req ;
  console.log(req);
  var botdetail = new Botdetail();
 //body parser lets us use the req.body
botdetail.sid = 1;
botdetail.bid = 2;
botdetail.intent ="test";
botdetail.steps = 1;
botdetail.qst="test"
botdetail.fld_type="radio"
botdetail.ans="test"
botdetail.is_active=1
botdetail.save(function(err) {
 if (err){
	 res.send(err);
 }
 else{res.json({ message: 'botdetail successfully added!' });
 }
 
 });
 //res.json({ message: 'API Initialized!'});
});

router.get('/fetch', function(req, res, next) {
  res.json({ message: 'API Initialized!'});
});

module.exports = router;