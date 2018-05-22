/*
 * ログアウト処理
 *
 */
var express = require('express');
var router = express.Router();

// リンクが出来ないので、GETでログアウト
router.get('/', function(req, res, next) {
    delete req.session.user;    
    res.render('login', 
	       { title: 'サンプル アプリケーション', 
		 user: req.session.user, 
		 expressFlash: req.flash('success') });
});


module.exports = router;
