/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *
 * Leviate v1.0 - Parallax Script
 *
 * This file is part of Leviate, a Minimalist One Page Template build for sale at ThemeForest.
 * For questions, suggestions or support request, please mail me at maimairel@yahoo.com
 *
 */

;(function( $, window, document, undefined ) {

	var Parallax = function( element, options ) {
		if( arguments ) {
			this.init( element, options );
		}
	}

	Parallax.prototype = {
		defaults: {
			xpos: '50%', // the background-x position
			enableParallax: true, 
			speedFactor: 0.4, // the scrolling speed relative to the window
			loadFirst: true, // load the background before displaying it, only available if data-background is specified
			loadingText: 'loading...' // the loading text to display on the target element
		}, 

		init: function( element, options ) {
			this.element = $( element );
			this.opts = $.extend({ windowHeight: $( window ).height() }, this.defaults, options );

			if( ( this.backgroundImage = this.element.data( 'background' ) ) ) {

				if( this.opts.loadFirst ) {

					this.loadingText = $( '<span class="bg-loading"></span>' ).text( this.opts.loadingText );
					this.element.append( this.loadingText );
					
					$( '<img>' )
						.one( 'load.parallax', $.proxy( this.activate, this ) )
						.attr( 'src', this.backgroundImage  );

				} else {

					this.element.css({ 'backgroundImage': 'url(' + this.backgroundImage + ')' });
					this.activate();
				}
			} else {

				this.activate();
			}
		}, 

		activate: function() {

			if( this.backgroundImage && this.opts.loadFirst ) {
				this.element.css({ 'backgroundImage': 'url(' + this.backgroundImage + ')' });
				this.loadingText && this.loadingText.remove();
			}

			if( this.opts.enableParallax ) {
				$( window )
					.on( 'scroll.parallax', $.proxy(function() { this.refresh(); }, this))
					.on( 'smartresize.parallax orientationchange.parallax', $.proxy(function() {
						this.opts.windowHeight = $( window ).height();
						this.refresh();
					}, this));
			}
		}, 

		refresh: function() {

			var windowPos = $( window ).scrollTop();
			var currentPos = this.element.offset().top;
			var height = this.element.outerHeight();

			if (currentPos + height < windowPos || currentPos > windowPos + this.opts.windowHeight ) {
				return;
			}

			this.element.css('backgroundPosition', this.opts.xpos + " " + Math.round((currentPos - windowPos) * this.opts.speedFactor) + "px");
		}
	};

	$.fn.parallax = function( options ) {
		return this.each(function() {
			new Parallax( this, options );
		});
	};

}) ( jQuery, window, document );