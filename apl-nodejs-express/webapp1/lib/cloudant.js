const appEnv = require("./vcap_env");

// クラウダントへの接続
var cloudant;
if (appEnv.services['cloudantNoSQLDB']) {
    var Cloudant = require('cloudant');
    cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
}
module.exports = cloudant;
