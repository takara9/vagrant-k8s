/*
 * 認証とアクセスコントロールのミドルウェア
 *
 * 出来たらローカルの仕組みで、セキュリティを確保して、
 * LDAPとか他の認証サービスと連携出来たらいいね。
 */

//var users = { 'tkr': 'password' };  // ユーザーパスワード

module.exports = function(req, res, next) {

    //var method = req.method.toLowerCase();
    //var user = req.body;
    // DELETEでリンクできないので、GETでログアウトを実施
    //var logout = (method === 'get' && req.url === '/logout');
    //    var login = (method === 'post' && user);

    // ログアウト
    /*
    if (logout) {
	delete req.session.user;
    }
    */

    // ログイン
    /*
    if (login) {
	Object.keys(users).forEach(function(name) {
            if (user.name === name && user.pwd === users[name]) {
	        req.session.user = {
		    name: user.name,
		    pwd: user.pwd
		};
                // ログイン成功時の飛び先を設定
                req.url = '/';
            } else {
	        req.flash('success', 'ログイン失敗、ユーザー名またはパスワードが誤りです。');
            }
	});
    }
    */

    // セッションが無ければ ログイン画面へ
    if (!req.session.user) {req.url = '/login'}

    next();
}
