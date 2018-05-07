/*
 * テンプレートページ
 */

var express = require('express');
var router = express.Router();

function render(req, res, next) {
    res.render('template', 
      { 
        title: 'テンプレート', 
        user: req.session.user, 
        expressFlash: req.flash('success')
      }
    );
}

router.get('/', function(req, res, next) {
    render(req, res, next);
});

router.post('/', function(req, res, next) {
    console.log("req = ", req);
    console.log("req = ", req.body);
    console.log("req = ", req.body.text);
    render(req, res, next);
});

module.exports = router;
