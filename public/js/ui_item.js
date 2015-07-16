
 var param = {};
$(function(){
 console.log('ui_item.js in');

 // サーバから取得したデータを、htmlテーブルに追加
 var showTable = function(data) {
 $("#tableItems").append("<tr></tr>")
 .find("tr:last")
 .append("<td>" + data.date + "</td>")
 .append("<td>" + data.item1 + "</td>")
 .append("<td>" + "aaa" + "</td>")
 .append("<td>" + "bbb" + "</td>")
 .append("<td><img src = '/images/newapp-icon.png' class = 'image-rounded'></td>")
 };

 // 追加ボタン（index.htmlのid=add）押下時 実行
 $("#add").click(function(e){ e.preventDefault();
 param.item1 = $("#name").val() || "";
 param.test0 = $("#item1").val() || "";
 param.test1 = $("#item2").val() || "";;
 param.test2 = $("#item3").val() || "";
 param.test3 = $("#item4").val() || "";




 // POSTでのajaxコールで、サーバーのapp.jsのapp.post /add呼び出し
 $.ajax({
 type: 'POST',
 data: JSON.stringify(param),
 contentType: 'application/json',
 url: '/add',
 success: function(data) {
 console.log('success add: ' + JSON.stringify(data));
 showTable(data);
 },
 error: function(data) { console.log('error add: ' + JSON.stringify(data)); }
 });

 // 入力項目名を空白に
 $("#item1").val('');
 });

 // 全件表示ボタン（index.htmlのid=getAll）押下時 実行
 $("#getAll").click(function(e){ e.preventDefault();
   $("#tableItems").empty();

   // POSTでのajaxコールで、サーバーのapp.jsのapp.post /getAll呼び出し
   $.ajax({
   type: 'POST',
   data: {},
   contentType: 'application/json',
   url: '/getAll',
   success: function(rows) {
   for(var i=0; i<rows.length; i++) {
   console.log(' row '+ i +": "+ JSON.stringify(rows[i]));
   showTable(rows[i].value);

   }
   },
   error: function(data) { console.log('error getAll: ' + JSON.stringify(data)); }
   });
 });

 // 全件削除ボタン（index.htmlのid=removeAll）押下時 実行
 $("#removeAll").click(function(e){ e.preventDefault();

 // POSTでのajaxコールで、サーバーのapp.jsのapp.post呼び出し
 $.ajax({
 type: 'POST',
 data: {},
 contentType: 'application/json',
 url: '/removeAll',
 success: function(data) { console.log('success removeAll'); },
 error: function(data) { console.log('error getAll: ' + JSON.stringify(data)); }
 });

 $("#tableItems").empty();
 });
 });


 // sekiya 全件表示ボタン（index.htmlのid=getAll）押下時 実行

function cheack(){
   console.log('DEBUG param.item1 : '+param.item1);
   console.log('DEBUG param.test0 : '+param.test0);
   console.log('DEBUG param.test1 : '+param.test1);
   console.log('DEBUG param.test2 : '+param.test2);
   console.log('DEBUG param.test3 : '+param.test3);

   // POSTでのajaxコールで、サーバーのapp.jsのapp.post /getAll呼び出し
   $.ajax({
   type: 'POST',
   data: JSON.stringify(param),
   contentType: 'application/json',
   url: '/cheackAll',
   success: function(rows) {
      alert("答えは"+ rows);
   },
   error: function(data) { console.log('error getAll: ' + JSON.stringify(data)); }
   });
 }

//kondo file選択画面疑似操作
function file_up_giji(){
	var file_button = document.getElementById( 'file_button' );
	//var file_button_giji = document.getElementById( 'file_button_giji' );

	file_button.click();
}
