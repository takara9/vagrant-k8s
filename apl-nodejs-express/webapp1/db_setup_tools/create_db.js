#!/usr/bin/env node
/*                                                                                        
  データベース新規作成
*/


// 固有名称
var dbn = "session_express";
var service_instance_name = 'kube-cloudant';
var vcap_path = '../webapp1/config/vcap-local.json';


// 環境からの接続情報取得
var cfenv = require("cfenv");
var vcapLocal;
try {
    vcapLocal = require(vcap_path);
} catch (err) {
    throw err;
}
var appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
var appEnv = cfenv.getAppEnv(appEnvOpts);
var svc = appEnv.getServiceCreds(service_instance_name);


// クラウダントとの接続処理
var Cloudant = require('cloudant');
var cloudant = Cloudant(svc.url);


// DB削除                                                                                   
cloudant.db.destroy(dbn, function(err) {
  // DB作成
  cloudant.db.create(dbn, function(err) {
    if (err) throw err;
    console.log("データベース作成成功");
  });
});






