
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
    console.log('これを追加'+data.itemname);

    $("#tableItems").append("<tr></tr>")
             .find("tr:last")
             .append("<td>" + data.itemname + "</td>")
             .append("<td>" + data.item1 + "</td>")
             .append("<td>" + data.item2 + "</td>")
             .append("<td>" + data.item3 + "</td>")
             .append("<td>" + data.item4 + "</td>")
             .append("<td><img src = 'https://52.69.211.101/blue/send_img.php?id="+data.id_counter+"' id = "+data.id_counter+" class = 'delite_button image-rounded' ></td>");
    makedelite();

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
       console.log('この番号で登録いたしました: ' + data);
       //var now = now_time();
       //var file_name = now + '_'+data +'.jpg';
       var file_name = data +'.jpg';
       console.log('この名前で保存しておきます: ' + file_name);
       file_upload(file_name);
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


 // 全件表示ボタン（index.htmlのid=getAll）押下時 実行
 $("#getAll").click(function(e){
      e.preventDefault();
     $("#tableItems").empty();
     name_input.viewername = myName || "";
     console.log('getAll 押されました　name.item1 '+name_input.viewername);


     // POSTでのajaxコールで、サーバーのapp.jsのapp.post /getAll呼び出し
     $.ajax({
           type: 'POST',
           data: JSON.stringify(name_input),
           contentType: 'application/json',
           url: '/getAll',
           success: function(rows) {
           for(var i=0; i<rows.length; i++) {
             console.log('これをテーブルに追加 row '+ i +": "+ JSON.stringify(rows[i]));
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
function makedelite(){
  console.log('makedelite 作成');
  $('.delite_button').on('click',function(){
    //alert('delite_button')

    param.username = myName || "";
    param.id_counter =  $(this).attr('id') || "";

    console.log('param.username '+ param.username);
    console.log('param.itemname '+ param.id_counter);

    $.ajax({
    type: 'POST',
    data: JSON.stringify(param),
    contentType: 'application/json',
    url: '/remove',
    success: function(rows) {
       $("#tableItems").empty();
       console.log('lets show all ');
       //showall();

    },
    error: function(data) { console.log('error remove: ' + JSON.stringify(data)); }
    });
  });
}






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





//$("#file_upload_test").click(function(e){ e.preventDefault();
  function file_upload(name){
     alert('up!!');
      //var src = document.getElementById('user_clothes').src;
      var canvas = document.getElementById('canvas');
      var canvas_img = canvas.toDataURL('image/png', 0.8);
      console.log('これを送信'+canvas_img);
      console.log('この名前で送信'+name);
    //var hostUrl= 'http://localhost/bluemix_charenge/save.php'; // データ送信先
    var hostUrl= 'https://52.69.211.101/blue/save.php'; // データ送信先
    $.ajax({
        url: hostUrl,
        type:'POST',
        //dataType: 'jsonp',
        //jsonpCallback: 'callback',
        dataType: 'json',
        //data : {img : document.getElementById('user_clothes').src,
        data : {img : canvas_img,
                name : name},
        timeout:10000,
        success: function(data) {
            // 成功
            alert("ok");
            console.log(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // 失敗
            alert("error");
        }
    });
  //});
  };


    function file_get(name){
       alert('ほしい!!');
        console.log('この名前がほしい'+name);
      //var hostUrl= 'http://localhost/bluemix_charenge/save.php'; // データ送信先
      var hostUrl= 'https://52.69.211.101/blue/send_img.php'; // データ送信先
      $.ajax({
          url: hostUrl,
          type:'POST',
          //dataType: 'jsonp',
          //jsonpCallback: 'callback',
          dataType: 'json',
          data : {name : name},
          timeout:10000,
          success: function(data) {
              // 成功
              alert("ok");
              console.log(data);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              // 失敗
              alert("error");
          }
      });
    };

  function now_time(){
    myD = new Date();
    myYear = myD.getFullYear();
    myMonth = myD.getMonth() + 1;
    myDate = myD.getDate();
    myDay = myD.getDay();
    myHours = myD.getHours();
    myMinutes = myD.getMinutes();
    mySeconds = myD.getSeconds();

    now_time = myYear + myMonth + myDate+'_'+myHours+myMinutes+mySeconds;
    return now_time;

  }




   // POSTでのajaxコールで、サーバーのapp.jsのapp.post呼び出し
   /*
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
     */






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
	var file_button = document.getElementById( 'tops_file_button' );
	//var file_button_giji = document.getElementById( 'file_button_giji' );

	file_button.click();
}

$(function(){
    var setFileInput = $('.imgInput');

    setFileInput.each(function(){
        var selfFile = $(this),
        selfInput = $(this).find('input[type=file]');

        selfInput.change(function(){
            var file = $(this).prop('files')[0],
            fileRdr = new FileReader(),
            selfImg = selfFile.find('.imgView');

            if(!this.files.length){
                if(0 < selfImg.size()){
                    selfImg.remove();
                    return;
                }
            } else {
                if(file.type.match('image.*')){
                    if(!(0 < selfImg.size())){
                        selfFile.append('<img id ="user_clothes" width="10%" height="10%" alt="" class="imgView">');
                    }
                    var prevElm = selfFile.find('.imgView');
                    fileRdr.onload = function() {
                        prevElm.attr('src', fileRdr.result);
                    }
                    fileRdr.readAsDataURL(file);
                } else {
                    if(0 < selfImg.size()){
                        selfImg.remove();
                        return;
                    }
                }
                look_img_change();
            }
        });
    });
});



function look_img_change() {
  alert('size change');
    var img = document.getElementById("user_clothes");
    img.width = 100;
	  img.height = 100;
    img.onload = function() {
      draw_can(img.src);
    }
}

function draw_can(src) {
      //alert('書くよ');
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        var image = new Image();
        image.src = src;
        //alert(image.src);
        //canvas.width = 50;
        //canvas.height = 50;
        //context.drawImage(image, 0, 0,50,50);
        //alert('drawed');
        //file_upload_test('hoge.jpg');
        //var file_name_pre = now_time();
        //var file_name = file_name_pre + '.png'
        image.onload = function() {
                alert('lets');
            canvas.width = 25;
            canvas.height = 25;
            context.drawImage(image, 0, 0,25,25);
            //file_upload_test(file_name,canvas);
        }
    }
}
/*
function aaaa(){
  showTable(aaa);
}
*/
/*
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
*/
