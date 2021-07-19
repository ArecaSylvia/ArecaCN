/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main_content');

	// Nav.
		var $nav = $('#float_nav');
		var $nav_height=$('#navbar').height();

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
							$nav.css({'top':$nav_height,'z-index':1});
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

		}

})(jQuery);