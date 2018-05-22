var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var stylus = require('stylus');

var stylus = require('express-stylus');
var nib = require('nib');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var handlebars = require('express-handlebars');
var app = express();


//試しのグローバル変数　本来はセッション変数であるべき
var line_start = 0;
var line_disp = 20;


// ==================================================================
var vcap_path = './config/vcap-local.json';
//instance_name = 'Cloudant NoSQL DB-j9';
var instance_name = 'kube-cloudant';

// データベース接続
var cdb = require('./lib/cloudant');
// 環境変数、または、JSONファイルからCloudantの接続先を取得
var cfenv = require("cfenv");
var vcapLocal;
try {
    vcapLocal = require(vcap_path);
} catch (err) {
    console.log(err);
}
var appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
var appEnv = cfenv.getAppEnv(appEnvOpts);
var svc = appEnv.getServiceCreds(instance_name);
console.log("vcapLocal = ",vcapLocal);
console.log("credentials = ", svc.url);

//var mdb = require('./lib/mongodb');

// ==================================================================
// セッション管理
var session = require('express-session');
var CloudantStore = require('connect-cloudant-store')(session);

// オンメモリに保存する場合
//var sessionStore = new session.MemoryStore;

// クラウダントで共有する場合
var sessionStore = new CloudantStore({
        database: 'session_express',
	url: svc.url
});

// セッションDB接続のコールバック
sessionStore.on('connect', function() {
    console.log("Cloudant Session store is ready for use ");
});
 
sessionStore.on('disconnect', function() {
    console.log("failed to connect to cloudant db - by default falls back to MemoryStore");
});
 
sessionStore.on('error', function(err) {
    console.log("You can log the store errors to your app log");
});

// ミドルウェア設定
var sessionOptions = {
  store: sessionStore,
  secret: 'May the force be with you',
  resave: false,
  saveUninitialized: true,
  proxy: true
};
app.use(session(sessionOptions));
// ==================================================================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(flash());

app.use(stylus({
  src: path.join(__dirname, 'public/stylesheets'),
  use: [nib()],
  import: ['nib']
}));

app.use(express.static(path.join(__dirname, 'public')));

// ルーティング処理
var login  = require('./routes/login');
var logout = require('./routes/logout');
var index  = require('./routes/index'); // トップページの表示
var users  = require('./routes/users'); // テキストメッセージの表示
var list   = require('./routes/list_database'); // 
var form   = require('./routes/input_form');
var temp   = require('./routes/template');
var edit   = require('./routes/edit');
var view   = require('./routes/view');
var store  = require('./routes/store');
var auth   = require('./lib/authenticate');


// ミドルウェア設定
app.use(auth);  // 認証 セッションを調べて、無ければログインへ飛ばす

// アドレスとルーティングの対応　(但し、Viewとの対応はルーティング処理の中）
app.use('/', index);              // トップ画面送出
app.use('/login',  login);        // GET ログイン画面表示, POST ユーザー認証
app.use('/logout', logout);       // GET セッションを消して、ログイン画面へ

app.use('/users', users);         // コンテンツ表示 サブディレクトリテスト

// ルータ処理に二つ以上の機能をパックにして、アドレスを変えて呼び出す
app.use('/list', list);           // データベースの内容を表示(定型)、ページ送り機能あり
app.use('/move', list);           // 前後ページの移動

// GETとPOSTに応じた機能を実装
app.use('/input_form', form);     // GET  入力フォーム表示
app.use('/store', form);          // POST 登録処理 -> 入力フォーム表示
app.use('/update', store);        // POST 更新処理 -> 詳細表示
app.use('/edit',   edit);         // POST キーで取得 -> 入力表示

// リストのテーブルの行メニュー
app.use('/detail', view);  // 詳細画面表示
app.use('/delete', edit);  // 削除

app.use('/tmp', temp);

// ==================================================================
// エラーハンドラー
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use('/:page', login);　　// デフォルト設定 　ルート以下全て、routesへルーティング


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
