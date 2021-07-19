$(function(){
	if($(window).width() > 767){
	$('ul.nav li.dropdown').hover(            
	    function() {
	        // $(this).find('.dropdown-menu').stop( true, true ).delay(180).fadeIn(350);
	        $(this).toggleClass('open');
	    },
	    function() {
	        // $(this).find('.dropdown-menu').stop( true, true ).delay(180).fadeOut(350);
	        $(this).toggleClass('open');          
	    });
	}
});