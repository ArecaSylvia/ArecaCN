$(function(){

/*全局禁用cache緩存*/
  $(document).ready(function() {
    $.ajaxSetup({ cache: false });
  });

/*變數*/
  var type
  var subtype

/*Component Type聯動Model Name欄位*/
  $.ajax({
    url:'json/select_type.json',
    dataType:'json'
  }).done(function(res){
    type=res
    init()
  })

  function init(){
    $.each(type, function(index, val) {
      var $option = $("<option></option>")
      $option.val(index).html(index)
      $('#type').append($option)
    })

    $('#type').on('change',function(){
      $('#os_select').not('hidden').addClass('hidden')
      $('#os_linux_select').not('hidden').addClass('hidden')
      $('#dataTable').not('hidden').addClass('hidden')
      $('#driverTable').not('hidden').addClass('hidden')
      $('#driverTable02').not('hidden').addClass('hidden')
      $('#manualTable').not('hidden').addClass('hidden')
      $('#manualTable02').not('hidden').addClass('hidden')
      $('#subtype > option').remove()
      $('#itemtype > option').remove()
      var num = $('#type :selected').text();
      $.each(type[num],function(index,val){
        var $option = $("<option></option>")
        $option.val(index).html(val)
        $('#subtype').append($option)
      })
    })
  }


/*Item Type欄位變動*/
  $.ajax({
    url:'json/select_item.json',
    dataType:'json'
  }).done(function(res){
    subtype=res
    item_select()
  })

  function item_select(){
    $('#subtype').on('change',function(){
      $('#os_select').not('hidden').addClass('hidden')
      $('#os_linux_select').not('hidden').addClass('hidden')
      $('#dataTable').not('hidden').addClass('hidden')
      $('#driverTable').not('hidden').addClass('hidden')
      $('#driverTable02').not('hidden').addClass('hidden')
      $('#manualTable').not('hidden').addClass('hidden')
      $('#manualTable02').not('hidden').addClass('hidden')

      $('#itemtype > option').remove()
      $.each(subtype[$('#type').val()],function(index, val){
          var $option = $("<option></option>")
          $option.val(index).html(val)
          $('#itemtype').append($option)
      })

      var num = $('#type').val();
      var itemnum = $('#itemtype').val();
      var subnum = $('#subtype').val();
      var html

      //連動
      //item選項為firmware時
      if(itemnum=="fw"){
        html =""

        //共用fw_interlink
        $.ajax({
          url:'json/fw_interlink.json',
          dataType:'json'
        }).done(function(res0){
          var data=res0
          var i
          switch(true){
            case subnum=="104"||subnum=="105":
              i=1
              fw_select(data[1])
            break;
            case subnum=="506"||subnum=="508"||subnum=="509":
              i=1
              fw5_select(data[1])
            break;
            case subnum=="108":
              i=2
              fw_select(data[2])
            break;
            case subnum=="507":
              i=2
              fw5_select(data[2])
            break;
            case subnum=="1018":
              i=2
              fw2_select(data[2])
            break;
            case subnum=="106":
              i=3
              fw_select(data[3])
            break;
            case subnum=="109"||subnum=="110":
              i=3
              fw_select(data[3])
              /*fw1883_select(data[3])*/
            break;
            case subnum=="303"||subnum=="503"||subnum=="510"||subnum=="511"||subnum=="512":
              i=3
              fw5_select(data[3])
            break;
            case subnum=="401"||subnum=="402"||subnum=="406":
              i=4
              fw4_select(data[4])
            break;
            case subnum=="301"||subnum=="306":
              i=5
              fw3_select(data[5])
            break;
            case subnum=="302"||subnum=="307":
              i=6
              fw3_select(data[6])
            break;
          }
        })


        //一般RAID Card區
        $.ajax({
          url:'json/fw_raidcard.json',
          dataType:'json'
        }).done(function(res1){
          var data=res1
          var z
          switch(true){
            case subnum=="101"||subnum=="102":
              z = parseInt(subnum.substring(2))-1
              fw_select(data[z])
            break;
            case subnum=="103":
              fw2_select(data[2])
            break;
            case subnum=="107":
              fw_select(data[6])
            break;
            case subnum=="111":
              fw_select(data[4])
            break;
            case subnum=="701"||subnum=="702":
              fw_select(data[7])
            break;
          }
        })


        //Discontinued RAID Card區
        $.ajax({
          url:'json/fw_dis_adapter.json',
          dataType:'json'
        }).done(function(res){
          var data=res
          switch(true){
            case subnum=="1**":
              fw_dis_select(data)
              //隱藏Compatibility項目
              // $('#itemtype > option:nth-child(3)').not('hidden').addClass('hidden');
            break;
          }
        })


        //SAS Non-RAID Adapters
        $.ajax({
          url:'json/fw_nonraid.json',
          dataType:'json'
        }).done(function(res2){
          var data=res2
          switch(true){
            case subnum=="201":
              fw4_select(data[0])
            break;
            case subnum=="202":
              $('#dataTable').not('hidden').addClass('hidden');
            break;
          }
        })



        //Subsystem/External RAID Solution
        $.ajax({
          url:'json/fw_subsystem.json',
          dataType:'json'
        }).done(function(res3){
          var data=res3
          switch(true){
            case subnum=="304":
              fw7_select(data,0,0)
            break;
            case subnum=="305"||subnum=="308":
              fw7_select(data,1,3)
            break;
          }
        })


        //Discontinued Subsystem/External RAID Solution
        $.ajax({
          url:'json/fw_dis_subsystem.json',
          dataType:'json'
        }).done(function(res){
          var data=res
          switch(true){
            case subnum=="3**":
              fw_dis_select(data)
              //隱藏Compatibility項目
              // $('#itemtype > option:nth-child(3)').not('hidden').addClass('hidden');
            break;
          }
        })




        //JBOD
        $.ajax({
          url:'json/fw_jbod.json',
          dataType:'json'
        }).done(function(res4){
          var data=res4
          switch(true){
            case subnum=="403"||subnum=="405":
              fw4_select(data[0])
            break;
          }
        })


        //Discontinued JBOD
        $.ajax({
          url:'json/fw_dis_expander.json',
          dataType:'json'
        }).done(function(res){
          var data=res
          switch(true){
            case subnum=="4**":
              fw_dis_select(data)
              //隱藏Compatibility項目
              // $('#itemtype > option:nth-child(2)').not('hidden').addClass('hidden');
            break;
          }
        })


        //Thunderbolt
        $.ajax({
          url:'json/fw_thunderbolt.json',
          dataType:'json'
        }).done(function(res5){
          var data=res5
          switch(true){
            case subnum=="502"||subnum=="505":
              fw6_select(data[0])
            break;
            case subnum=="513":
              fw5_select(data[1])
            break;
          }
        })

      }



      //item選項為Manual時
      if(itemnum=="manual"){

        $('.panel-heading').text('Manual & Documents')

        function manual_select_accessory(res,a,b){
          var html
          var data = res
          html="";
          for(var i=a;i<b+1;i++){
            html += "<tr>";
            html += "<td>"+data[i].item+"</td>";
            html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
            html += "<td>" +data[i].date+ "</td>";
            html += "</tr>";
          }
          $('tbody').html(html);
        }
        switch(true){
          case subnum=="601":
            $.ajax({
              url:'../support/json/manual_accessory.json',
              dataType:'json'
            }).done(function(res){
              var data = res
              manual_select_accessory(data,1,1);
            })
            $('#manualTable02').removeClass('hidden');
          break;
          case subnum=="602":
            $.ajax({
              url:'../support/json/manual_accessory.json',
              dataType:'json'
            }).done(function(res){
              var data = res
              manual_select_accessory(data,2,2);
            })
            $('#manualTable02').removeClass('hidden');
          break;
        }

      }


    })
  }





/*讀取顯示table程式集*/

  function fw_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default.json', function(data) {
      for(var i=0;i<data.length;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }

  function fw2_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default.json', function(data) {
      for(var i=0;i<2;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }

  function fw3_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default_subsystem.json', function(data) {
      for(var i=0;i<data.length;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }

  function fw4_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default_expander.json', function(data) {
      for(var i=0;i<data.length;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }

  function fw5_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default_thunderbolt.json', function(data) {
      for(var i=0;i<2;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }

  function fw6_select(data){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    $.getJSON('json/fw_default_qfc.json', function(data) {
      for(var i=0;i<data.length;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }



  function fw7_select(data,a,b){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    for(var i=a;i<b+1;i++){
      html += "<tr>";
      html += "<td>"+data[i].item+"</td>";
      html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
      html += "<td>" +data[i].date+ "</td>";
      html += "<td>" +data[i].remark+ "</td>";
      html += "</tr>";
    }

    $.getJSON('json/fw_default.json', function(data) {
      for(var i=0;i<2;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
      });

    $('#dataTable').removeClass('hidden');
  }



  function fw1883_select(data,a){
    $('.panel-heading').text('Firmware')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    html += "<tr>";
    html += "<td>"+data.item+"</td>";
    html += "<td><a href=\'"+data.route+"\' download>" +data.version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
    html += "<td>" +data.date+ "</td>";
    html += "<td>" +data.remark+ "</td>";
    html += "</tr>";

    //取1883x firmware
    $.getJSON('json/fw_raidcard.json', function(data) {
      for(var i=3;i<4;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
      });

    $.getJSON('json/fw_default.json', function(data) {
      for(var i=0;i<data.length;i++){
        html += "<tr>";
        html += "<td>"+data[i].item+"</td>";
        html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
        html += "<td>" +data[i].date+ "</td>";
        html += "<td>" +data[i].remark+ "</td>";
        html += "</tr>";
      }
      $('tbody').html(html);
    });
    $('#dataTable').removeClass('hidden');
  }




  function fw_dis_select(data){
    $('.panel-heading').text('Firmware')
    var html
    for(var i=0;i<data.length;i++){
      html += "<tr>";
      html += "<td>"+data[i].item+"</td>";
      html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
      html += "<td>" +data[i].date+ "</td>";
      html += "<td>" +data[i].remark+ "</td>";
      html += "</tr>";
    }
    $('tbody').html(html);
    $('#dataTable').removeClass('hidden');
  }



  function bios_select(data,a,b){
    $('.panel-heading').text('BIOS')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    for(var i=a;i<b+1;i++){
      html += "<tr>";
      html += "<td>"+data[i].item+"</td>";
      html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
      html += "<td>" +data[i].date+ "</td>";
      html += "<td>" +data[i].remark+ "</td>";
      html += "</tr>";
    }

    $('tbody').html(html);
    $('#dataTable').removeClass('hidden');
  }



  function compatibility_select(data,a,b){
    $('.panel-heading').text('Compatibility')
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    html="";
    for(var i=a;i<b+1;i++){
      html += "<tr>";
      html += "<td>"+data[i].item+"</td>";
      html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "<img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
      html += "<td>" +data[i].date+ "</td>";
      html += "<td>" +data[i].remark+ "</td>";
      html += "</tr>";
    }

    $('tbody').html(html);
    $('#dataTable').removeClass('hidden');
  }











/*顯示table*/
$('#itemtype').on('change',function(){
  var num = $('#type').val();
  var itemnum = $('#itemtype').val();
  var subnum = $('#subtype').val();
  var html
  var btn_html

  $('#os_select').not('hidden').addClass('hidden');
  $('#os_linux_select').not('hidden').addClass('hidden');
  $('#dataTable').not('hidden').addClass('hidden');
  $('#driverTable').not('hidden').addClass('hidden');
  $('#driverTable02').not('hidden').addClass('hidden')
  $('#manualTable').not('hidden').addClass('hidden');
  $('#manualTable02').not('hidden').addClass('hidden');


    //item選項為firmware時
    //與Item Type欄位連動//
    if(itemnum=="fw"){
      html =""

      //共用fw_interlink
      $.ajax({
        url:'json/fw_interlink.json',
        dataType:'json'
      }).done(function(res0){
        var data=res0
        var i
        switch(true){
          case subnum=="104"||subnum=="105":
            i=1
            fw_select(data[1])
          break;
          case subnum=="108":
            i=2
            fw_select(data[2])
          break;
          case subnum=="106":
            i=3
            fw_select(data[3])
          break;
          case subnum=="109"||subnum=="110":
            i=3
            fw_select(data[3])
            /*fw1883_select(data[3])*/
          break;
          case subnum=="506"||subnum=="508"||subnum=="509":
            i=1
            fw5_select(data[1])
          break;
          case subnum=="507":
            i=2
            fw5_select(data[2])
          break;
          case subnum=="1018":
            i=2
            fw2_select(data[2])
          break;
          case subnum=="303"||subnum=="503"||subnum=="510"||subnum=="511"||subnum=="512":
            i=3
            fw5_select(data[3])
          break;
          case subnum=="401"||subnum=="402"||subnum=="406":
            i=4
            fw4_select(data[4])
          break;
          case subnum=="301"||subnum=="306":
            i=5
            fw3_select(data[5])
          break;
          case subnum=="302"||subnum=="307":
            i=6
            fw3_select(data[6])
          break;
        }
      })


      //一般RAID Card區
      $.ajax({
        url:'json/fw_raidcard.json',
        dataType:'json'
      }).done(function(res1){
        var data=res1
        var z
        switch(true){
          case subnum=="101"||subnum=="102":
            z = parseInt(subnum.substring(2))-1
            fw_select(data[z])
          break;
          case subnum=="103":
            fw2_select(data[2])
          break;
          case subnum=="107":
            fw_select(data[6])
          break;
          case subnum=="111":
            fw_select(data[4])
          break;
          case subnum=="701"||subnum=="702":
            fw_select(data[7])
          break;
        }
      })


      //Discontinued RAID Card區
      $.ajax({
        url:'json/fw_dis_adapter.json',
        dataType:'json'
      }).done(function(res){
        var data=res
        switch(true){
          case subnum=="1**":
            fw_dis_select(data)
          break;
        }
      })


      //SAS Non-RAID Adapters
      $.ajax({
        url:'json/fw_nonraid.json',
        dataType:'json'
      }).done(function(res2){
        var data=res2
        switch(true){
          case subnum=="201":
            fw2_select(data[0])
          break;
          case subnum=="202":
            $('#dataTable').not('hidden').addClass('hidden');
          break;
        }
      })



      //Subsystem/External RAID Solution
      $.ajax({
        url:'json/fw_subsystem.json',
        dataType:'json'
      }).done(function(res3){
        var data=res3
        switch(true){
          case subnum=="304":
            fw7_select(data,0,0)
          break;
          case subnum=="305"||subnum=="308":
            fw7_select(data,1,3)
          break;
        }
      })



      //Discontinued Subsystem/External RAID Solution
      $.ajax({
        url:'json/fw_dis_subsystem.json',
        dataType:'json'
      }).done(function(res){
        var data=res
        switch(true){
          case subnum=="3**":
            fw_dis_select(data)
          break;
        }
      })



      //JBOD
      $.ajax({
        url:'json/fw_jbod.json',
        dataType:'json'
      }).done(function(res4){
        var data=res4
        switch(true){
          case subnum=="403"||subnum=="405":
            fw4_select(data[0])
          break;
        }
      })



        //Discontinued JBOD
        $.ajax({
          url:'json/fw_dis_expander.json',
          dataType:'json'
        }).done(function(res){
          var data=res
          switch(true){
            case subnum=="4**":
              fw_dis_select(data)
            break;
          }
        })



      //Thunderbolt
      $.ajax({
        url:'json/fw_thunderbolt.json',
        dataType:'json'
      }).done(function(res5){
        var data=res5
        switch(true){
          case subnum=="502"||subnum=="505":
            fw6_select(data[0])
          break;
          case subnum=="513":
            fw5_select(data[1])
          break;
        }
      })




    }




    //item選項為BIOS時
    if(itemnum=="bios"){
      html =""

      //SAS Non-RAID Adapters
      $.getJSON('json/bios_nonraid.json',function(data){
        switch(true){
          case subnum=="201"||subnum=="501":
            bios_select(data,1,2)
          break;
          case subnum=="202":
            bios_select(data,3,4)
          break;
          case subnum=="1009":
            bios_select(data,5,6)
          break;
        }
      })

    }




    //item選項為API code時
    if(itemnum=="api"){
      $('.panel-heading').text('API Code')
        html =""

        $.getJSON('json/api.json', function(data) {
            html += "<tr>";
            html += "<td>"+data[0].item+"</td>";
            html += "<td><a href=\'"+data[0].route+"\' download>" +data[0].version+ "</a> <img src=\"img/download_icon.svg\" style=\"width: 20px;\"></td>";
            html += "<td>" +data[0].date+ "</td>";
            html += "<td>" +data[0].remark+ "</td>";
            html += "</tr>";
          $('tbody').html(html);
          $('#dataTable').removeClass('hidden');
        })
    }



    //item選項為Compatibility時
    if(itemnum=="compatibility"){
      html =""

      $.getJSON('json/compatibility.json', function(data) {
        switch(true){
          case subnum=="101"||subnum=="102"||subnum=="1**"||subnum=="3**"||subnum=="4**"||subnum=="7**":
            compatibility_select(data,0,1)
          break;
          case subnum=="502"||subnum=="505":
            $('#dataTable').not('hidden').addClass('hidden');
          break;
          default:
            compatibility_select(data,2,3)
        }
      })

    }



    //item選項為Driver時
    if(itemnum=="driver"){
        switch(true){
          case subnum=="701"||subnum=="702":
            $("#driverTable").load('../products/_driver_raidcard_1886.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="101"||subnum=="102":
            $("#driverTable").load('../products/_driver_raidcard_1110.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="103":
            $("#driverTable").load('../products/_driver_raidcard_1203.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="105":
            $("#driverTable").load('../products/_driver_raidcard_1264.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="111":
            $("#driverTable").load('../products/_driver_raidcard_1884.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="201":
            $("#driverTable").load('../products/_driver_nonraid.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="202":
            $("#driverTable").load('../products/_driver_nonraid_1330.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="501"||subnum=="502"||subnum=="503":
            $.ajax({
              url:'../products/_driver_4050t2.html',
              dataType:'html'
            }).done(function(res){
              var Obj = $("<code></code>").append($(res));//包裝res
              var $html = $("#collapse3>div", Obj); //取得res中的對應區塊
              var value = $($html).html();
              $("#driverTable").html(value);
              if (subnum=="501") {
                $(".4607,.4883").remove();
              }else if (subnum=="502") {
                $(".active,.4320,.4883").remove();
                $('.4607a').addClass('active')
              }else if (subnum=="503") {
                $(".active,.4320,.4607").remove();
                $('.4883a').addClass('active')
              }
            })

            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');

          break;
          case subnum=="504"||subnum=="505":
            $.ajax({
              url:'../products/_driver_4050t3.html',
              dataType:'html'
            }).done(function(res){
              var Obj = $("<code></code>").append($(res));//包裝res
              var $html = $("#collapse3>div", Obj); //取得res中的對應區塊
              var value = $($html).html();
              $("#driverTable").html(value);
              if (subnum=="504") {
                $(".4607,.4883").remove();
              }else if (subnum=="505") {
                $(".active,.4108,.4883").remove();
                $('.4607a').addClass('active');
              }
            })

            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');

          break;
          case subnum=="506"||subnum=="507":
            $("#driverTable").load('../products/_driver_t2.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="508"||subnum=="509"||subnum=="510"||subnum=="511"||subnum=="512":
            $("#driverTable").load('../products/_driver_t3.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="513":
            $("#driverTable").load('../products/_driver_t3_san.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="301"||subnum=="306":
            $("#driverTable").load('../products/_driver_subsystem_sata.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          case subnum=="302"||subnum=="303"||subnum=="304"||subnum=="305"||subnum=="307"||subnum=="308"||subnum=="3**":
            $("#driverTable").load('../products/_driver_subsystem_sas.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
          break;
          default:
            $("#driverTable").load('../products/_driver_raidcard.html #collapse3>div');
            $('#driverTable').removeClass('hidden');
            $('#driverTable02').removeClass('hidden');
        }
    }




    //item選項為Manual時
    if(itemnum=="manual"){

      $('.panel-heading').text('Manual & Documents')

      function manualtable_load(res){
        var Obj = $("<code></code>").append($(res));//包裝res
        var $html = $("#collapse1>div", Obj); //取得res中的對應區塊
        var value = $($html).html();
        $(".manualTable").html(value);
      }

      function manual_select(res,a,b){
        var html
        var data = res
        html="";
        for(var i=a;i<b+1;i++){
          html += "<tr>";
          html += "<td>"+data[i].item+"</td>";
          html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "</a> <img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
          html += "<td>" +data[i].date+ "</td>";
          html += "</tr>";
        }

        $.getJSON('../support/json/manual_dis_others.json', function(data) {
          for(var i=0;i<data.length;i++){
            html += "<tr>";
            html += "<td>"+data[i].item+"</td>";
            html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "</a> <img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
            html += "<td>" +data[i].date+ "</td>";
            html += "</tr>";
          }
          $('tbody').html(html);
          });
      }

      function manual_select_dis(res){
        var html
        var data = res
        html="";
        for(var i=0;i<data.length;i++){
          html += "<tr>";
          html += "<td>"+data[i].item+"</td>";
          html += "<td><a href=\'"+data[i].route+"\' download>" +data[i].version+ "</a> <img src=\"img/download_icon.svg\" style=\"width: 20px;\"></a></td>";
          html += "<td>" +data[i].date+ "</td>";
          html += "</tr>";
        }
        $('tbody').html(html);
      }

      switch(true){
        case subnum=="101"||subnum=="102":
          $.ajax({
            url:'../products/sataadapters-1110-1120.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="103":
          $.ajax({
            url:'../products/sataadapters-1203.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="104":
          $.ajax({
            url:'../products/sasadapters-12x4.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="105":
          $.ajax({
            url:'../products/sataadapters-1264il.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="106":
          $.ajax({
            url:'../products/sasadapters-12x6.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="107":
          $.ajax({
            url:'../products/mezzanine-1680P.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="108":
          $.ajax({
            url:'../support/json/manual_dis_raidcard.json',
            dataType:'json'
          }).done(function(res){
            var data=res
            manual_select(data,7,11)
          })
          $('#manualTable02').removeClass('hidden');
        break;
        case subnum=="109":
          $.ajax({
            url:'../products/sasadapters-1883.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="110":
          $.ajax({
            url:'../products/mezzanine-1883P.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="111":
          $.ajax({
            url:'../products/sasadapters-1884.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="1**":
          $.ajax({
            url:'json/manual_dis_raidcard.json',
            dataType:'json'
          }).done(function(res){
            manual_select_dis(res);
          })
          $('#manualTable02').removeClass('hidden');
        break;

        case subnum=="201":
          $.ajax({
            url:'../products/nonraid-1320.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="202":
          $.ajax({
            url:'../products/nonraid-1330.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;

        case subnum=="301":
          $.ajax({
            url:'../products/external-5066.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="302":
          $.ajax({
            url:'../products/storage-8042.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="303":
          $.ajax({
            url:'../products/storage-8050U3.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="304":
          $.ajax({
            url:'../products/external-8068.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="305":
          $.ajax({
            url:'../products/external-8088.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="306":
          $.ajax({
            url:'../products/storage-71xx.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="307":
          $.ajax({
            url:'../products/storage-72xx.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="308":
          $.ajax({
            url:'../products/storage-9200.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="3**":
          $.ajax({
            url:'json/manual_dis_subsystem.json',
            dataType:'json'
          }).done(function(res){
            manual_select_dis(res);
          })
          $('#manualTable02').removeClass('hidden');
        break;

        case subnum=="401":
          $.ajax({
            url:'../products/expander-8028.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="402"||subnum=="403":
          $.ajax({
            url:'../products/jbod-4038.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="404":
          $.ajax({
            url:'../products/jbod-4038ml.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="405":
          $.ajax({
            url:'../products/jbod-72xx.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="406":
          $.ajax({
            url:'../products/jbod-92xx.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="4**":
          $.ajax({
            url:'json/manual_dis_expander.json',
            dataType:'json'
          }).done(function(res){
            manual_select_dis(res);
          })
          $('#manualTable02').removeClass('hidden');
        break;

        case subnum=="501"||subnum=="502"||subnum=="503":
          $.ajax({
            url:'../products/thunderbolt-4050T2.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
            if (subnum=="501") {
              $(".4607,.4883").remove();
            }else if (subnum=="502") {
              $(".4320,.4883").remove();
            }else if (subnum=="503") {
              $(".4320,.4607").remove();
            }
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="504"||subnum=="505":
          $.ajax({
            url:'../products/thunderbolt-4050T3.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
            if (subnum=="504") {
              $(".4607").remove();
            }else if (subnum=="505") {
              $(".4108").remove();
            }
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="506":
          $.ajax({
            url:'../support/json/manual_dis_thunderbolt.json',
            dataType:'json'
          }).done(function(res){
            var data=res
            manual_select_dis(data)
          })
          $('#manualTable02').removeClass('hidden');
        break;
        case subnum=="507":
          $.ajax({
            url:'../products/thunderbolt-8050T2.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="508"||subnum=="510":
          $.ajax({
            url:'../products/thunderbolt-8050T3.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="509"||subnum=="511":
          $.ajax({
            url:'../products/thunderbolt-8050T3U.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="512":
          $.ajax({
            url:'../products/thunderbolt-8050T3-rack.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="513":
          $.ajax({
            url:'../products/thunderbolt-8050T3-san.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="701":
          $.ajax({
            url:'../products/trimode-1886.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;
        case subnum=="702":
          $.ajax({
            url:'../products/nvme-1886.html',
            dataType:'html'
          }).done(function(res){
            manualtable_load(res);
          })
          $('#manualTable').removeClass('hidden');
        break;

      }
    }





})







  // $.ajax({
  //   url:'json/select_os.json',
  //   dataType:'json'
  // }).done(function(res){
  //   ostype=res
  //   os_select()
  // })


  // function os_select(){
  //   var $driverItem = $("")
  //   $("#driverTable").append($driverItem)
  // }





    // //item選項為manual時
    // if(itemnum=="manual"){
    //   $('.panel-heading').text('Manual & Datasheet')
    //   html =""

    //   $.getJSON('json/raid_card.json', function(data) {
    //     console.log(data)
    //     html += "<tr>";
    //     html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
    //     html += "<td>" +data[i].version+ "</td>";
    //     html += "<td>" +data[i].date+ "</td>";
    //     html += "<td>" +data[i].remark+ "</td>";
    //     html += "</tr>";
    //     $('tbody').html(html);
    //     $('#dataTable').removeClass('hidden');
    //   });
    // }


  // function fw7_select(data,a,b){
  //   $('.panel-heading').text('Firmware')
  //   var num = $('#type').val();
  //   var itemnum = $('#itemtype').val();
  //   var subnum = $('#subtype').val();
  //   var html
  //   var btn_html

  //   html="";
  //   for(var i=a;i<b+1;i++){
  //     html += "<tr>";
  //     html += "<td><a href=\'"+data[i].route+"\' download>"+data[i].item+"</a></td>";
  //     html += "<td>" +data[i].version+ "</td>";
  //     html += "<td>" +data[i].date+ "</td>";
  //     html += "<td>" +data[i].remark+ "</td>";
  //     html += "</tr>";
  //   }

  //   $.getJSON('json/fw_default.json', function(data) {
  //     for(var i=0;i<2;i++){
  //       html += "<tr>";
  //       html += "<td><a href=\'"+data[i].route+"\' download>"+data[i].item+"</a></td>";
  //       html += "<td>" +data[i].version+ "</td>";
  //       html += "<td>" +data[i].date+ "</td>";
  //       html += "<td>" +data[i].remark+ "</td>";
  //       html += "</tr>";
  //     }
  //     $('tbody').html(html);
  //     });

  //   $('#dataTable').removeClass('hidden');
  // }



  //     //item選項為driver時
  //     case itemnum == "driver":

  //       $('.panel-heading').text('Driver & Utility')
  //       html = ""
  //       btn_html = ""
  //       $('#os_select').toggleClass('hidden');

  //       $.getJSON('json/select_os.json', function(data){
          
  //         console.log(data)
  //         if(num=="1" || "3"){
  //             for(var i=0;i<data[0].length;i++){
  //               btn_html += "<li><a href='#' class=\'"+data[0][i]+"\'>"+data[0][i]+"</a></li>";
  //             }
  //         }else if(num=="4"){
  //             for(var i=0;i<data[1].length;i++){
  //               btn_html += "<li><a href='#' class=\'"+data[1][i]+"\'>"+data[1][i]+"</a></li>";
  //             }
  //         }else if(num=="5" || "6" || "7"){
  //             for(var i=0;i<data[2].length;i++){
  //               btn_html += "<li><a href='#' class=\'"+data[2][i]+"\'>"+data[2][i]+"</a></li>";
  //             }
  //         }else if(num=="8"){
  //             for(var i=0;i<data[3].length;i++){
  //               btn_html += "<li><a href='#' class=\'"+data[3][i]+"\'>"+data[3][i]+"</a></li>";
  //             }
  //         }

  //         $('#os_select ul').html(btn_html);
  //       });


  //     break;







  //     //item選項為compatibility時
  //     case itemnum=="compatibility":

  //       $('.panel-heading').text('Compatibility')
  //       html =""

  //       $.getJSON('json/raid_card.json', function(data) {
  //         console.log(data)
  //         i = parseInt(subnum.substring(1,3))-1
  //         console.log(i)
  //         html += "<tr>";
  //         html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
  //         html += "<td>" +data[i].version+ "</td>";
  //         html += "<td>" +data[i].date+ "</td>";
  //         html += "<td>" +data[i].remark+ "</td>";
  //         html += "</tr>";
  //         $('tbody').html(html);
  //       });

  //       $.getJSON('json/fw_default.json', function(data) {
  //         console.log(data)
  //         for(var i=0;i<data.length;i++){
  //           html += "<tr>";
  //           html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
  //           html += "<td>" +data[i].version+ "</td>";
  //           html += "<td>" +data[i].date+ "</td>";
  //           html += "<td>" +data[i].remark+ "</td>";
  //           html += "</tr>";
  //         }
  //         $('tbody').html(html);
  //       });

  //     break;


  //     }

  // });




  // $('#os_select .dropdown-menu > li >a').on('click',function(){
  //     console.log("YES");
  //     $('#os_linux_select').removeClass('hidden');
  // });





})