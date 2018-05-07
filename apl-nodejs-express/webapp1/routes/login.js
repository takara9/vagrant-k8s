/*
 * ログイン画面の表示
 *
 */
var express = require('express');
var router = express.Router();


var users = { 'tkr': 'password' };  //暫定 ユーザーパスワード


//function render(req, res, next) {
//    res.render('login', { title: 'サンプル アプリケーション', user: req.session.user, expressFlash: req.flash('success') });
//}

// ログイン・フォーム表示
router.get('/', function(req, res, next) {
    //render(req, res, next);
    res.render('login', 
	       { title: 'サンプル アプリケーション', 
		 user: req.session.user, 
		 expressFlash: req.flash('success') });
});

// 認証処理
router.post('/', function(req, res, next) {

    var method = req.method.toLowerCase();
    var user = req.body;

    Object.keys(users).forEach(function(name) {
        if (user.name === name && user.pwd === users[name]) {
	    req.session.user = {
		name: user.name,
		pwd: user.pwd
	    };
            // ログイン成功時の飛び先を設定
            req.url = '/';
	    req.flash('success', 'ログイン成功、ようこそ');
	    res.render('toppage', 
		       { title: 'サンプル アプリケーション', 
			 user: req.session.user, 
			 expressFlash: req.flash('success') 
		       });  

        } else {
            req.url = '/login';
	    req.flash('success', 'ログイン失敗、ユーザー名またはパスワードが誤りです。');	
	    res.render('login', 
		       { title: 'サンプル アプリケーション', 
			 user: req.session.user, 
			 expressFlash: req.flash('success') 
		       });  
        }
    });
    //render(req, res, next);
});


module.exports = router;
