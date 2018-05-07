var express = require('express');
var dao = require('../lib/cloudant_dao');
var router = express.Router();


function render(req, res, next, form_data) {
    res.render('input_form', 
	       { 
		   title: 'データ登録フォーム', 
		   user: req.session.user, 
		   expressFlash: req.flash('info'),
		   field: form_data,
		   action: '/store'
	       });
}

// フォームの初期化
function clear_form(form_data) {
    return {
	todoufuken: "",
	todoufuken_kana: "",
        todoufuken_CD: "",
	sicyoson: "",
        sicyoson_kana: "",
        jusho_CD: "",
        zip_code: ""
    }
}

// フォームが呼び出された時の処理
router.get('/', function(req, res, next) {
    req.flash('info','フォームにインプットして送信をクリックしてください')
    render(req, res, next, clear_form());
});

// フォームからPOSTされた時の処理
router.post('/', function(req, res, next) {
    //console.log("req = ", req);
    // POSTされたデータをCloudantへ書き込む処理
    //key = req.body.jusho_CD;
    //dao.update(key, req.body, function(err) {
    dao.insert(req.body, function(err) {
	if (err) {
	    req.flash('info', 'データ登録失敗');
	    render(req, res, next, req.body);
	} else {
	    req.flash('info', 'データ登録成功');
	    render(req, res, next, clear_form());
	}
	render(req, res, next);
    });
});

module.exports = router;
