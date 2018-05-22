/*

 テキストメッセージのレスポンス

*/

var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.send('GET respond with a resource');
});

router.get('/v1', function(req, res, next) {
  res.send('GET /v1 respond with a resource');
});

router.get('/v2', function(req, res, next) {
  res.send('GET /v2 respond with a resource');
});


router.put('/', function(req, res, next) {
  res.send('PUT / respond with a resource');
});

router.delete('/', function(req, res, next) {
  res.send('DELETE / respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('POST / respond with a resource');
});



module.exports = router;
