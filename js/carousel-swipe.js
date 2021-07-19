
$(document).ready(function() { 
   $("#carousel-index").on('swiperight',function() {  
      $(this).carousel('prev');  
      });  
//add your other targets here
   $("#carousel-index").on('swipeleft',function() {  
      $(this).carousel('next');  
 });  
});  
