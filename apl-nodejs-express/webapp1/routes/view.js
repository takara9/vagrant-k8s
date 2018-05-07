// view.js と editは統合したい
// コールバックの第一引数の役割がキーになるね。
//

var express = require('express');
var dao = require('../lib/cloudant_dao');
var router = express.Router();


function render(req, res, next, form_data) {
    res.render('view_form', 
	       { 
		   title: '詳細表示フォーム', 
		   user: req.session.user, 
		   expressFlash: req.flash('info'),
		   field: form_data
	       });
}

// フォームが呼び出された時の処理
router.get('/', function(req, res, next) {
    console.log("==== req = ", req.body);
    console.log("==== req.query.jcd = ", req.query.jcd);

    dao.findByKey(req.query.jcd, function(err,doc) {
	console.log("doc = ",doc);
	req.flash('info', 'データ取得成功');
	render(req, res, next, doc);
    });

});

// フォームからPOSTされた時の処理
router.post('/', function(req, res, next) {
    console.log("req = ", req.body);

    dao.findByKey(req.body.text, function(err,doc) {
	console.log("doc = ",doc);
	req.flash('info', 'データ取得成功');
	render(req, res, next, doc);
    });

});

module.exports = router;
