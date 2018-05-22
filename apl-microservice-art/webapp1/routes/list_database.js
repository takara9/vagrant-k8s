var express = require('express');
var router = express.Router();
var cloudant = require("../lib/cloudant.js");
var dbn = "sample";
var cdb = cloudant.db.use(dbn);
var db_data = [];
var async = require('async');


function render(req, res, next) {
    res.render('list', { title: 'データ リスト', user: req.session.user, expressFlash: req.flash('success'), rec_data: db_data, start: req.session.user.line_start, rows: req.session.user.line_disp });
}

router.get('/', function(req, res, next) {
    console.log("req = ", req.query, req.baseUrl);
    var i = 0;
    var temp_data;


    console.log("req.session.user.line_start: ", req.session.user.line_start);
    if ( req.session.user.line_start === undefined ) {
        req.session.user.line_start = 0;
        req.session.user.line_disp = 20;
    }	


    if (req.query.next) {
	console.log("req.query.next = ", req.query.next);
	console.log("NEXT---");
	req.session.user.line_start = req.session.user.line_start + req.session.user.line_disp;
    }

    if (req.query.prev) {
	console.log("req.query.prev = ", req.query.prev);
	console.log("PREV---");
	req.session.user.line_start = req.session.user.line_start - req.session.user.line_disp;
	if (req.session.user.line_start < 0) {
	    req.session.user.line_start = 0;
	}
    }

    //--------------------
    // キーリスト
    // バッファを持ちたいなぁ、セッションとの関係がどうなるかなぁ
    // やっぱり、セッション管理しないとダメだよね。とほほ
    // 先ずは、ページ送りを実現しようかね。
    cdb.list(function(err, body) {
        if (err) throw err; 
        async.series([
            function(callback) {
		//console.log("body rows = ", body.rows.length);
		var lines = body.rows.slice(req.session.user.line_start, (req.session.user.line_start + req.session.user.line_disp));
		//console.log("lines = ", lines);
                lines.forEach(function(doc) {
                    async.series([
                        function(callback) {
			    //console.log("doc = ",doc);
                            cdb.get(doc.key, function(err,data) {
                                temp_data = data;
                                callback(null);
                            });
                        },
                        function(callback) {
                           db_data[i++] = temp_data;
                           callback(null);
                        }],
  	                function(err) {
                            if (i == lines.length) callback(null);
                        }
                    );
		 });
            }],
            function(err) {
                render(req, res, next);
            }
        );
    });
    //--------------------
});

//router.post('/', function(req, res, next) {
//    render(req, res, next);
//});


module.exports = router;
