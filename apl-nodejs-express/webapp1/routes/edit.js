var express = require('express');
var dao = require('../lib/cloudant_dao');
var router = express.Router();


function render(req, res, next, form_data) {
    res.render('input_form', 
	       { 
		   title: '編集フォーム', 
		   user: req.session.user, 
		   expressFlash: req.flash('info'),
		   field: form_data,
		   action: '/update'
	       });
}

function render2(req, res, next, db_data) {
    res.render( 'list', 
		{ 
		    title: 'データ リスト', 
		    user: req.session.user, 
		    expressFlash: req.flash('success'), 
		    rec_data: db_data, 
		    start: req.session.user.line_start, 
		    rows: req.session.user.line_disp 
		});
}


// フォームが呼び出された時の処理
router.get('/', function(req, res, next) {
    //req.flash('info','フォームにインプットして送信をクリックしてください')
    // 空のフォーム？
    render(req, res, next, clear_form());
});


// フォームからPOSTされた時の処理
router.post('/', function(req, res, next) {
    //console.log("req = ", req.body);
    dao.findByKey(req.body.jcd, function(err,doc) {
	console.log("doc = ",doc);
	req.flash('info', 'データ取得成功');
	render(req, res, next, doc);
    });

});


// フォームからPOSTされた時の処理
router.post('/delete', function(req, res, next) {
    dao.deleteByKey(req.body.jcd, function(err,doc) {
	console.log("DELETE doc = ",doc);
	req.flash('info', 'データ削除成功');
	res.render('deleted', 
		   { 
		       title: '削除完了', 
		       user: req.session.user, 
		       expressFlash: req.flash('success')
		   }
		  );
    });
});


// フォームが呼び出された時の処理
router.delete('/', function(req, res, next) {
    req.flash('info','削除しました')

    // 空のフォーム？
    
    render(req, res, next, clear_form());
});


module.exports = router;
