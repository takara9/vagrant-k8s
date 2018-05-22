/*                                                                                        
  Cloudant Data Access Lib
*/
var cloudant = require("./cloudant.js");
var dbn = "sample";
var cdb = cloudant.db.use(dbn);

// 一件挿入
exports.insert = function(body,callback) {
    jdoc = {
        "_id":             body.jusho_CD,
        "jusho_CD":        body.jusho_CD,
        "zip_code":        body.zip_code,
        "todoufuken_CD":   body.todoufuken_CD,
        "todoufuken":      body.todoufuken,
        "todoufuken_kana": body.todoufuken_kana,
        "sicyoson":        body.sicyoson,
        "sicyoson_kana":   body.sicyoson_kana
    }

    cdb.insert( jdoc, jdoc._id, function(err, body, header) {
        if (err) {
            console.log('ERROR jdoc insert', body);
        } else {
            console.log('SUCCESS jdoc insert', body);
	}
	callback(err);
    });
}


// 更新
//   キーで取得して、_idと_revを上書きして再度書き込み
exports.update = function(key, body, callback) {
    cdb.get(key, function(err, doc) {
	console.log("get doc = ",doc);
	if (!err) {
            console.log('SUCCESS get data', body);
	    doc2 = body;
	    doc2._id = doc._id;
	    doc2._rev = doc._rev;
	    cdb.insert(doc2 ,key, function(err, body, header) {
		if (!err) {
		    console.log('SUCCESS insert data', body);
		} else {
		    console.log('FAILD insert data', body);
		}
		callback(err);
	    });
	} else {
	    console.log('FAILED get data', body);
	    callback(err);
	}
    });
}


// 一件取り出し
exports.findByKey = function(key,callback) {
    cdb.get(key, function(err,doc) {
	callback(err,doc);
    });
}

// キーで削除
exports.deleteByKey = function(key,callback) {
    cdb.get(key, function(err,data) {
	console.log("delete data = ", data);
	cdb.destroy(data._id, data._rev, function(err, body, header) {
	    console.log("deleted = ", key);
	    callback(err);
	});
    });
}

