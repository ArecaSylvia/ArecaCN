$(function(){

/*全局禁用cache緩存*/
  $(document).ready(function() {
    $.ajaxSetup({ cache: false });
  });

   $("#navbar").load('navbar-firstpage.html #navbar>div');
   $("#modal-search").load('navbar-firstpage.html #modal-search>div');
   $("#footer").load('footer-firstpage.html #footer>div');


});