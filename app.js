/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

//POSTパラメータ取得　body-parser設定
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//Date()で現在時刻取得
var dateutil = require('date-utils');

// Cloudant用アクセス・モジュール「cradle」設定
var cradle = require('cradle');

// Cloudant DB接続情報取得
var services = JSON.parse(process.env.VCAP_SERVICES);
var credentials = services['cloudantNoSQLDB'][0].credentials;
var host = credentials.host;
var port = credentials.port;
var options = {
 cache : true,
 raw : false,
 secure : true,
 auth : {
 username : credentials.username,
 password : credentials.password
 }
};

// データベース接続
var db = new (cradle.Connection)(host, port, options).database('itemsdb');

// 「追加」ボタンの id=add, ui_item.jsの url:'/add'でcall
app.post('/add', function(req, res){
 var date = new Date();
 var now = date.toFormat("YYYY/MM/DD HH24:MI:SS");
 req.body.date = now;

 // 項目の保存
 db.save(now, req.body);
 console.log('app.js saved: ' + JSON.stringify(req.body));

 res.send(req.body);
});

//「全件削除」ボタンの id=removeAll, ui_item.jsの url:'/removeAll'でcall
app.post('/removeAll', function(req, res){

 // 全件検索を、作成したview名 items_view にて実行
 db.view('items/items_view', function (err, rows) {
 if (!err) {
 rows.forEach(function (id, row) {
 db.remove(id);
 console.log("removed key is: %s", id);
 });
 } else { console.log("app.js db.remove error: " + err); }

 });

 res.send({});
});

//「全件表示」ボタンの id=getAll, ui_item.jsの url:'/getAll'でcall
app.post('/getAll', function(req, res){
 returnTable(res);
});

var returnTable = function(res) {
 // 全件検索を、作成したview名 items_view にて実行
 db.view('items/items_view', function (err, rows) {
 if (!err) {
 rows.forEach(function (id, row) {
 console.log("key: %s, row: %s", id, JSON.stringify(row));
 });
 } else { console.log("app.js returnTable error: " + err); }

 res.send(rows);
 });
};


//sekiya「全件表示」ボタンの id=getAll, ui_item.jsの url:'/getAll'でcall
app.post('/cheackAll', function(req, res){
 cheackTable(req,res);
});

var cheackTable = function(req,res) {
 // 全件検索を、作成したview名 items_view にて実行
 console.log("bycliant test0: %s", req.body.test0);
 db.view('items/items_view', function (err, rows) {
 if (!err) {
 rows.forEach(function (id, row) {
   console.log("key: %s, row: %s", id, JSON.stringify(row));
   console.log("key: %s, row: %s", id, req.body.test0);

 });
 } else { console.log("app.js returnTable error: " + err); }

 res.send(rows);
 });
};





app.post('/',function(req, res){
  var date = new Date();
  var now = date.toFormat("YYYY/MM/DD HH24:MI:SS");
  req.body.date = now;

  console.log('app.js req.body: '+ JSON.stringify(req.body));
  res.send(req.body);
});

//サーバーポート設定
var port = (process.env.VCAP_APP_PORT || 3000);

//サーバー開始
app.listen(port);
console.log("server starting on " + port);




// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
//  console.log("server starting on " + appEnv.url);
//});
