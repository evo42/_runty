/**
* Fullscreenr - lightweight full screen background jquery plugin
* By Jan Schneiders
* Version 1.0
* www.nanotux.com
**/
(function($){	
	$.fn.fullscreenr = function(options) {
		if(options.height === undefined) alert('Please supply the background image height, default values will now be used. These may be very inaccurate.');
		if(options.width === undefined) alert('Please supply the background image width, default values will now be used. These may be very inaccurate.');
		if(options.bgID === undefined) alert('Please supply the background image ID, default #bgimg will now be used.');
		var defaults = { width: 1280,  height: 1024, bgID: 'bgimg' };
		var options = $.extend({}, defaults, options); 
		$(document).ready(function() { $(options.bgID).fullscreenrResizer(options);	});
		$(window).bind("resize", function() { $(options.bgID).fullscreenrResizer(options); });		
		return this; 		
	};	
	$.fn.fullscreenrResizer = function(options) {
		// Set bg size
		var ratio = options.height / options.width;	
		// Get browser window size
		var browserwidth = $(window).width();
		var browserheight = $(window).height();
		
		var w;
		var h;
		
		var hm = 25;
		var vm = 25;
		
		// Scale the image
		if (( browserheight  /browserwidth ) > ratio){
			w = browserheight / ratio;
			h = browserheight;
		    $(this).height(h);
		    $(this).width(w);
		} else {
			w = browserwidth;
			h = browserwidth * ratio;
		    $(this).width(w);
		    $(this).height(h);
		}
		// Center the image
		$(this).css('left', ( browserwidth - $(this).width())/2);
		$(this).css('top', ( browserheight - $(this).height())/2);
		//window.console.log('css: ' + (browserwidth - $(this).width())/2 + ' -- ' + (browserheight - $(this).height())/2);


		// set size
		$(this).attr('width', w );
		$(this).attr('height', h);
		window.console.log(' ** set size: ' + w + ' -- ' + h);

		// set touchslider size
		jQuery('.touchslider-item img.backgroud').width(w).height(h);
		
		// set projekktor size
		//projekktor('#player').setSize({width:w, height:h});
		
		// set video js size
		if ( typeof _V_ !== 'undefined' ) {
			_V_("#player").ready(function(){
				var player = this;
				//console.log(player);
				//player.play();
				player.width(w);
				player.height(h);
			});
		}
		
		return this;
	};
})(jQuery);