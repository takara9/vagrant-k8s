/*
 * テンプレートページ
 */

var express = require('express');
var router = express.Router();
var dao = require('../lib/cloudant_dao');

function render(req, res, next, form_data) {
    res.render('view_form', { 
	title: '詳細表示フォーム', 
	user: req.session.user, 
	expressFlash: req.flash('info'),
	field: form_data
    });
}

router.get('/', function(req, res, next) {
    render(req, res, next);
});

router.post('/', function(req, res, next) {
    //console.log("req = ", req);
    console.log("req = ", req.body);

    key = req.body.jusho_CD;
    dao.update(key, req.body, function(err) {
	if (err) {
	    req.flash('info', 'データ登録失敗');
	    //render(req, res, next, req.body);
	} else {
	    req.flash('info', 'データ登録成功');
	    //render(req, res, next, clear_form());
	}
	render(req, res, next, req.body);
	//render(req, res, next);
	//render(req, res, next, req.body);
    });


});

module.exports = router;
