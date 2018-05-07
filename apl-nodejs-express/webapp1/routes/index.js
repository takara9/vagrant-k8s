var express = require('express');
var router = express.Router();

function render(req, res, next) {
    res.render('toppage', 
	       { title: 'サンプル・アプリケーション トップページ', 
		 user: req.session.user, 
		 expressFlash: req.flash('success') 
	       });
}

// URLを指定した場合は、こちらが呼ばれる
router.get('/', function(req, res, next) {
    render(req, res, next);
});

// ログインはPOSTなので、こちらが呼ばれるので注意
router.post('/', function(req, res, next) {
    render(req, res, next);
});

module.exports = router;
