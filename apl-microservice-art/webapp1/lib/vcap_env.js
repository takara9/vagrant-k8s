const cfenv = require("cfenv");
var vcapLocal;
try {
    vcapLocal = require("../config/vcap-local.json");
} catch (err) {
    throw err;
}
const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
    const appEnv = cfenv.getAppEnv(appEnvOpts);

module.exports = appEnv;
