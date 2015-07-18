
 var param = {};
 var name_input = {};
 var deletea = {};
 var aaadao = {test0:'0',test1:'1',test2:'2',test3:'3',date:'333'};
 var myName;

 function init()
 {
     var result = {};
     if( 1 < window.location.search.length )
     {
         // 最初の1文字 (?記号) を除いた文字列を取得する
         var query = window.location.search.substring( 1 );

         // クエリの区切り記号 (&) で文字列を配列に分割する
         var parameters = query.split( '&' );

         for( var i = 0; i < parameters.length; i++ )
         {
             // パラメータ名とパラメータ値に分割する
             var element = parameters[ i ].split( '=' );

             var paramName = decodeURIComponent( element[ 0 ] );
             var paramValue = decodeURIComponent( element[ 1 ] );

             // パラメータ名をキーとして連想配列に追加する
             result[ paramName ] = paramValue;
         }
     }
     myName = result["namae"];
     document.getElementById('username1').value=myName;
     console.log('こんにちわ　'+myName+'さん');

 }


$(function(){
   console.log('ui_item.js in');
   //document.getElementById('username1').value=myName;

   // サーバから取得したデータを、htmlテーブルに追加
   var showTable = function(data) {
    console.log(data.username);

    $("#tableItems").append("<tr></tr>")
             .find("tr:last")
             .append("<td>" + data.itemname + "</td>")
             .append("<td>" + data.item1 + "</td>")
             .append("<td>" + data.item2 + "</td>")
             .append("<td>" + data.item3 + "</td>")
             .append("<td>" + data.item4 + "</td>")
             .append("<td><img src = '/images/newapp-icon.png' id = "+data.id_counter+" class = 'delite_button image-rounded' onClick=delete1("+data.id_counter+")></td>")
    };

   // tops_追加ボタン（index.htmlのid=add）押下時 実行
  $("#tops_add").click(function(e){ e.preventDefault();
       param.username = myName || "";
       param.itemname = $("#tops_name").val() || "";
       param.item1 = $("#tops_item1").val() || "";
       param.item2 = $("#tops_item2").val() || "";
       param.item3 = $("#tops_item3").val() || "";
       param.item4 = $("#tops_item4").val() || "";
       param.itemtype = 0;

       // POSTでのajaxコールで、サーバーのapp.jsのapp.post /add呼び出し
       $.ajax({
       type: 'POST',
       data: JSON.stringify(param),
       contentType: 'application/json',
       url: '/add',
       success: function(data) {
       console.log('success add: ' + JSON.stringify(data));
       //showTable(data);
       },
       error: function(data) { console.log('error add: ' + JSON.stringify(data)); }
       });
   });
/*
 $("#testtest").click(function(e){ e.preventDefault();
   showTable(aaadao);
 });
*/


 //
$("#bottom_add").click(function(e){ e.preventDefault();
   param.username = $("#name").val() || "";
   param.itemname = $("#bottom_name").val() || "";
   param.item1 = $("#bottom_item1").val() || "";
   param.test1 = $("#bottom_item2").val() || "";
   param.test2 = $("#bottom_item3").val() || "";
   param.test3 = $("#bottom_item4").val() || "";
   param.itemtype = 1

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
 });


 // shoes_追加ボタン（index.htmlのid=add）押下時 実行
$("#shoes_add").click(function(e){ e.preventDefault();
   param.username = $("#name").val() || "";
   param.itemname = $("#shoes_name").val() || "";
   param.item1 = $("#shoes_item1").val() || "";
   param.test1 = $("#shoes_item2").val() || "";
   param.test2 = $("#shoes_item3").val() || "";
   param.test3 = $("#shoes_item4").val() || "";
   param.itemtype = 2

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
 });

 // other_追加ボタン（index.htmlのid=add）押下時 実行
$("#other_add").click(function(e){ e.preventDefault();
   param.username = $("#name").val() || "";
   param.itemname = $("#other_name").val() || "";
   param.item1 = $("#other_item1").val() || "";
   param.test1 = $("#other_item2").val() || "";
   param.test2 = $("#other_item3").val() || "";
   param.test3 = $("#other_item4").val() || "";
   param.itemtype = 2

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
 //$("#item1").val('');
 });


 // 全件表示ボタン（index.htmlのid=getAll）押下時 実行
 $("#getAll").click(function(e){
      e.preventDefault();
     $("#tableItems").empty();
     name_input.viewername = myName || "";
     console.log('name.item1 '+name_input.viewername);


     // POSTでのajaxコールで、サーバーのapp.jsのapp.post /getAll呼び出し
     $.ajax({
     type: 'POST',
     data: JSON.stringify(name_input),
     contentType: 'application/json',
     url: '/getAll',
     success: function(rows) {
     for(var i=0; i<rows.length; i++) {
       console.log(' row '+ i +": "+ JSON.stringify(rows[i]));
       //showTable(rows[i].value);
       showTable(rows[i]);

     }
     },
     error: function(data) { console.log('error getAll: ' + JSON.stringify(data)); }
     });
});

function showall(){
  $("#tableItems").empty();
  name_input.viewername = myName || "";
  console.log('name.item1 '+name_input.viewername);


  // POSTでのajaxコールで、サーバーのapp.jsのapp.post /getAll呼び出し
  $.ajax({
  type: 'POST',
  data: JSON.stringify(name_input),
  contentType: 'application/json',
  url: '/getAll',
  success: function(rows) {
  for(var i=0; i<rows.length; i++) {
    console.log(' row '+ i +": "+ JSON.stringify(rows[i]));
    //showTable(rows[i].value);
    showTable(rows[i]);

  }
  },
  error: function(data) { console.log('error getAll: ' + JSON.stringify(data)); }
  });
}

// 全件削除ボタン（index.htmlのid=removeAll）押下時 実行

  $('.delite_button').click(function(){


    param.username = myName || "";
    param.itemname =  $(this).attr('id') || "";

    console.log('param.username '+ param.username);
    console.log('param.itemname '+ param.itemname);

    $.ajax({
    type: 'POST',
    data: JSON.stringify(param),
    contentType: 'application/json',
    url: '/remove',
    success: function(rows) {
       $("#tableItems").empty();
       showall();

    },
    error: function(data) { console.log('error remove: ' + JSON.stringify(data)); }
    });
  });






 // 全件削除ボタン（index.htmlのid=removeAll）押下時 実行
 $("#testtest").click(function(e){ e.preventDefault();

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
/*
function aaaa(){
  showTable(aaa);
}
*/
function delete1(obj){
  console.log(obj);
  param.username = myName || "";
  param.itemname = obj || "";

  console.log('param.username '+ param.username);
  console.log('param.itemname '+ param.itemname);

  $.ajax({
  type: 'POST',
  data: JSON.stringify(param),
  contentType: 'application/json',
  url: '/remove',
  success: function(rows) {
     alert("答えは"+ rows);
     showall();

  },
  error: function(data) { console.log('error remove: ' + JSON.stringify(data)); }
  });
}
