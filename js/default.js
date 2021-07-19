$(function(){

  /*全局禁用cache緩存*/
    $(document).ready(function() {
      $.ajaxSetup({ cache: false });
    });

   $("#navbar").load('../navbar.html #navbar>div');
   $("#modal-search").load('../navbar.html #modal-search>div');
   $("#footer").load('../footer.html #footer>div');

  //  $("#footer").load('../footer.html #footer>div',function(responseTxt,statusTxt,xhr){
  //   if(statusTxt=="success")
  //     alert("外部内容加载成功！");
  //   if(statusTxt=="error")
  //     alert("Error: "+xhr.status+": "+xhr.statusText);
  // });


	  // $('.dropdown-submenu a.test').on("click", function(e){
	  //   $(this).next('ul').toggle();
	  //   e.stopPropagation();
	  //   e.preventDefault();
	  // });


      // $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    //   $('.dropdown-submenu a.test').on("click", function(e){
    //   	console.log("YES");
    //     //點擊時避免跟隨href位置
    //     event.preventDefault();
    //     //避免在點擊時關閉菜單
    //     event.stopPropagation();
    //     if($(this).parent().hasClass('open') == false){ //當class=open為否時
    //       $(this).parent().addClass('open');
    //     }else{
    //       $(this).parent().removeClass('open');
    //     }
    // });

});