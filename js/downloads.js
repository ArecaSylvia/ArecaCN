$(function(){

  $('#type').val(0);

  $('#type').on('change',function(){
    $('#os_select').not('hidden').addClass('hidden');
    $('#os_linux_select').not('hidden').addClass('hidden');
    $('#dataTable').not('hidden').addClass('hidden');

    $('#subtype').text("");
    $('#subtype').append("<option value='0'>Product Select</option>");
    var num = $('#type').val();
    
    /*SATA RAID Adapters/SAS RAID Adapters*/  
    if(num=="1") {  $('#subtype').append("<option value='101'>ARC-1110</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='102'>ARC-1120</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='103'>ARC-1200</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='104'>ARC-1201/1202</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='105'>ARC-1203 series</option>");} 
    if(num=="1") {  $('#subtype').append("<option value='106'>ARC-1212/1222</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='107'>ARC-1213/1223</option>");  }  
    if(num=="1") {  $('#subtype').append("<option value='108'>ARC-1214/1224/1264/1284</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='109'>ARC-1215/1225</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='110'>ARC-1216/1226</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='111'>ARC-1680 series</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='112'>ARC-1880 series</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='113'>ARC-1880ix expander</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='114'>ARC-1882 series</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='115'>ARC-1882ix expander</option>");  }
    if(num=="1") {  $('#subtype').append("<option value='116'>ARC-1883 series</option>");}
    if(num=="1") {  $('#subtype').append("<option value='117'>ARC-1883ix expander</option>");  }


    /*Messanine Board*/ 
    if(num=="3") {  $('#subtype').append("<option value='301'>ARC-1680P</option>");  }
    if(num=="3") {  $('#subtype').append("<option value='302'>ARC-1882P</option>");  }



    /*SAS Non-RAID Adapters*/  
    if(num=="4") {  $('#subtype').append("<option value='401'>ARC-1320</option>");  }
    if(num=="4") {  $('#subtype').append("<option value='402'>Legacy Adapter</option>");  }



    /*Desktop RAID Subsystem/External RAID Solution*/  
    if(num=="5") {  $('#subtype').append("<option value='501'>ARC-5020</option>"); } 
    if(num=="5") {  $('#subtype').append("<option value='502'>ARC-5040</option>");  } 
    if(num=="5") {  $('#subtype').append("<option value='503'>ARC-5060</option>");  }
    if(num=="5") {  $('#subtype').append("<option value='504'>ARC-8040</option>");  } 
    if(num=="5") {  $('#subtype').append("<option value='505'>ARC-8050E</option>");  } 
    if(num=="5") {  $('#subtype').append("<option value='506'>ARC-9200 series</option>");  }



    /*External RAID Solution*/
    if(num=="6") {  $('#subtype').append("<option value='601'>ARC-5066</option>");  }
    if(num=="6") {  $('#subtype').append("<option value='602'>ARC-8007</option>");  } 
    if(num=="6") {  $('#subtype').append("<option value='603'>ARC-8068</option>");  } 
    if(num=="6") {  $('#subtype').append("<option value='604'>ARC-8008/8088</option>");  }




    /*JBOD/Expander Box*/
    if(num=="7") {  $('#subtype').append("<option value='701'>ARC-8016/ARC-8026</option>");  }
    if(num=="7") {  $('#subtype').append("<option value='702'>ARC-8018/ARC-8028</option>");  }
    if(num=="7") {  $('#subtype').append("<option value='703'>ARC-4036</option>");  }
    if(num=="7") {  $('#subtype').append("<option value='704'>ARC-4036ML</option>");  }
    if(num=="7") {  $('#subtype').append("<option value='705'>ARC-4038</option>");  }
    if(num=="7") {  $('#subtype').append("<option value='706'>ARC-4038ML</option>");  }



    /*Thunderbolt RAID Storage*/
    if(num=="8") {  $('#subtype').append("<option value='801'>ARC-4320T2</option>");  }
    if(num=="8") {  $('#subtype').append("<option value='802'>ARC-4607T2</option>");  }
    if(num=="8") {  $('#subtype').append("<option value='803'>ARC-4883T2</option>");  }
    if(num=="8") {  $('#subtype').append("<option value='804'>ARC-5026/ARC-5028T2</option>");  }
    if(num=="8") {  $('#subtype').append("<option value='805'>ARC-8050/ARC-8050T2</option>");  }
    if(num=="8") {  $('#subtype').append("<option value='806'>ARC-8050T3 series</option>");  }



    /*Internal RAID Rack*/
    if(num=="9") {  $('#subtype').append("<option value='901'>ARC-5033</option>");  }
    if(num=="9") {  $('#subtype').append("<option value='902'>Legacy Product</option>");  }



    /*Accessories*/
    if(num=="10") {  $('#subtype').append("<option value='1001'>ARC-1009/1035(LCD Manual)</option>");  }




    /*Legacy*/
    if(num=="20") {  $('#subtype').append("<option value='2001'>Legacy RAID adapter</option>");}
    
    
  });






  $('#subtype').on('change',function(){

    $('#itemtype').text("");

    var subnum = $('#subtype').val();

    $('#os_select').not('hidden').addClass('hidden');
    $('#os_linux_select').not('hidden').addClass('hidden');
    $('#dataTable').not('hidden').addClass('hidden');

    $('#itemtype').text("");
    $('#itemtype').append("<option value='0'>Item Select</option>");

    
    if(subnum) {  
      $('#itemtype').append("<option value='fw'>Firmware</option>");  }
    if(subnum!=="701" && subnum!=="702" && subnum!=="703" && subnum!=="704" && subnum!=="705" && subnum!=="706") { 
      $('#itemtype').append("<option value='api'>API Code</option>"); 
      $('#itemtype').append("<option value='driver'>Driver/Utility</option>");  }
    if(subnum!=="901" && subnum!=="902") {  
      $('#itemtype').append("<option value='compatibility'>Compatibility</option>");  }
    if(subnum) {  
      $('#itemtype').append("<option value='manual'>Manual & Datasheet</option>");  }

  });









  $('#itemtype').on('change',function(){
    var num = $('#type').val();
    var itemnum = $('#itemtype').val();
    var subnum = $('#subtype').val();
    var html
    var btn_html

    $('#os_select').not('hidden').addClass('hidden');
    $('#os_linux_select').not('hidden').addClass('hidden');
    $('#dataTable').not('hidden').addClass('hidden');


    if(itemnum=="api"){
      $('.panel-heading').text('API Code')
        html =""

      $.getJSON('json/api.json', function(data) {
        console.log(data)
          html += "<tr>";
          html += "<td><a href=\'"+data[0].route+"\' download>"+data[0].item+"</a></td>";
          html += "<td>" +data[0].version+ "</td>";
          html += "<td>" +data[0].date+ "</td>";
          html += "<td>" +data[0].remark+ "</td>";
          html += "</tr>";
        $('tbody').html(html);
        $('#dataTable').removeClass('hidden');
      });
    }




        



    // switch(true){


    //   //item選項為firmware時
    //   case itemnum=="fw":

    //     $('.panel-heading').text('Firmware')
    //     html =""

    //     $.getJSON('json/fw_interlink.json', function(data) {
    //       console.log(data)
    //       var i
    //       switch(true){
    //         case subnum=="107"||"112":
    //           i=0
    //         break;
    //         case subnum=="108":
    //           i=1
    //         break;
    //         case subnum=="109"||subnum=="114"||subnum=="302":
    //           i=2
    //         break;
    //         case subnum=="110"||subnum=="116":
    //           i=3
    //         break;
    //         case subnum=="113"||subnum=="115":
    //           i=4
    //         break;
    //         case subnum=="117":
    //           i=5
    //         break;

    //         default:
    //           return fw_raid()
    //       }
    //       html += "<tr>";
    //       html += "<td><a href=\'"+data[i].route+"\' download>"+data[i].item+"</a></td>";
    //       html += "<td>" +data[i].version+ "</td>";
    //       html += "<td>" +data[i].date+ "</td>";
    //       html += "<td>" +data[i].remark+ "</td>";
    //       html += "</tr>";
    //       $('tbody').html(html);
    //       fw_default()

    //       function fw_raid(){
    //         $.getJSON('json/fw_raid_card.json', function(data) {
    //           console.log("fw_raid")
    //           i = parseInt(subnum.substring(1,3))-1
    //           html += "<tr>";
    //           html += "<td><a href=\'"+data[i].route+"\' download>"+data[i].item+"</a></td>";
    //           html += "<td>" +data[i].version+ "</td>";
    //           html += "<td>" +data[i].date+ "</td>";
    //           html += "<td>" +data[i].remark+ "</td>";
    //           html += "</tr>";
    //           $('tbody').html(html);
    //           fw_default()
    //         });
    //       }
    //     });

    //     function fw_default(){
    //       $.getJSON('json/fw_default.json', function(data) {
    //         console.log(data)
    //         for(var i=0;i<data.length;i++){
    //           html += "<tr>";
    //           html += "<td><a href=\'"+data[i].route+"\' download>"+data[i].item+"</a></td>";
    //           html += "<td>" +data[i].version+ "</td>";
    //           html += "<td>" +data[i].date+ "</td>";
    //           html += "<td>" +data[i].remark+ "</td>";
    //           html += "</tr>";
    //         }
    //         $('tbody').html(html);
    //         $('#dataTable').removeClass('hidden');
    //       });
    //     }

    //   break;





    //   //item選項為API code時
    //   case itemnum=="api":

    //     $('.panel-heading').text('API Code')
    //     html =""

    //     $.getJSON('json/api.json', function(data) {
    //       console.log(data)
    //         html += "<tr>";
    //         html += "<td><a href=\'"+data[0].route+"\' download>"+data[0].item+"</a></td>";
    //         html += "<td>" +data[0].version+ "</td>";
    //         html += "<td>" +data[0].date+ "</td>";
    //         html += "<td>" +data[0].remark+ "</td>";
    //         html += "</tr>";
    //       $('tbody').html(html);
    //       $('#dataTable').removeClass('hidden');
    //     });

    //   break;






    //   //item選項為driver時
    //   case itemnum == "driver":

    //     $('.panel-heading').text('Driver & Utility')
    //     html = ""
    //     btn_html = ""
    //     $('#os_select').toggleClass('hidden');

    //     $.getJSON('json/select_os.json', function(data){
          
    //       console.log(data)
    //       if(num=="1" || "3"){
    //           for(var i=0;i<data[0].length;i++){
    //             btn_html += "<li><a href='#' class=\'"+data[0][i]+"\'>"+data[0][i]+"</a></li>";
    //           }
    //       }else if(num=="4"){
    //           for(var i=0;i<data[1].length;i++){
    //             btn_html += "<li><a href='#' class=\'"+data[1][i]+"\'>"+data[1][i]+"</a></li>";
    //           }
    //       }else if(num=="5" || "6" || "7"){
    //           for(var i=0;i<data[2].length;i++){
    //             btn_html += "<li><a href='#' class=\'"+data[2][i]+"\'>"+data[2][i]+"</a></li>";
    //           }
    //       }else if(num=="8"){
    //           for(var i=0;i<data[3].length;i++){
    //             btn_html += "<li><a href='#' class=\'"+data[3][i]+"\'>"+data[3][i]+"</a></li>";
    //           }
    //       }

    //       $('#os_select ul').html(btn_html);
    //     });


    //   break;







    //   //item選項為compatibility時
    //   case itemnum=="compatibility":

    //     $('.panel-heading').text('Compatibility')
    //     html =""

    //     $.getJSON('json/raid_card.json', function(data) {
    //       console.log(data)
    //       i = parseInt(subnum.substring(1,3))-1
    //       console.log(i)
    //       html += "<tr>";
    //       html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
    //       html += "<td>" +data[i].version+ "</td>";
    //       html += "<td>" +data[i].date+ "</td>";
    //       html += "<td>" +data[i].remark+ "</td>";
    //       html += "</tr>";
    //       $('tbody').html(html);
    //     });

    //     $.getJSON('json/fw_default.json', function(data) {
    //       console.log(data)
    //       for(var i=0;i<data.length;i++){
    //         html += "<tr>";
    //         html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
    //         html += "<td>" +data[i].version+ "</td>";
    //         html += "<td>" +data[i].date+ "</td>";
    //         html += "<td>" +data[i].remark+ "</td>";
    //         html += "</tr>";
    //       }
    //       $('tbody').html(html);
    //     });

    //   break;








    //   //item選項為manual時
    //   case itemnum=="manual":

    //     $('.panel-heading').text('Manual & Datasheet')
    //     html =""

    //     $.getJSON('json/raid_card.json', function(data) {
    //       console.log(data)
    //       i = parseInt(subnum.substring(1,3))-1
    //       console.log(i)
    //       html += "<tr>";
    //       html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
    //       html += "<td>" +data[i].version+ "</td>";
    //       html += "<td>" +data[i].date+ "</td>";
    //       html += "<td>" +data[i].remark+ "</td>";
    //       html += "</tr>";
    //       $('tbody').html(html);
    //     });

    //     $.getJSON('json/fw_default.json', function(data) {
    //       console.log(data)
    //       for(var i=0;i<data.length;i++){
    //         html += "<tr>";
    //         html += "<td><a href=\'"+data[i].route+"\'>"+data[i].item+"</a></td>";
    //         html += "<td>" +data[i].version+ "</td>";
    //         html += "<td>" +data[i].date+ "</td>";
    //         html += "<td>" +data[i].remark+ "</td>";
    //         html += "</tr>";
    //       }
    //       $('tbody').html(html);
    //     });

    //   break;





    //   }




  });




  $('#os_select .dropdown-menu > li >a').on('click',function(){
      console.log("YES");
      $('#os_linux_select').removeClass('hidden');
  });





});