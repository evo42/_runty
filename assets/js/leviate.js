/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *
 * Leviate v1.0 - Template Script
 *
 * This file is part of Leviate, a Minimalist One Page Template build for sale at ThemeForest.
 * For questions, suggestions or support request, please mail me at maimairel@yahoo.com
 *
 */

;(function( $, window, document, undefined ) {

	/* ==========================================================================
		Detect Handheld Devices
	============================================================================= */
	$.isHandheld = (function (a) {return /(android|bb\d+|meego).+mobile|android|ipad|playbook|silk|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))})(navigator.userAgent || navigator.vendor || window.opera);

	/* ==========================================================================
		Set Handheld class name for Mobile Browsers
	============================================================================= */
	$( 'html' ).toggleClass( 'handheld', $.isHandheld );


	$( window ).load(function() {

		/* ==========================================================================
			ScrollSpy
		============================================================================= */
		if( $.fn.scrollspy ) {
			$( 'body' ).scrollspy({
				target: '#zw-header'
			});

			$( window ).on( 'smartresize orientationchange', function() {
				$( 'body' ).scrollspy( 'refresh' );
			});
		}


		/* ==========================================================================
			Google Maps
		============================================================================= */
		if( $.fn.gmap3 ) {
			(function() {
				var wf = document.createElement('script');
				wf.src = 'http://maps.google.com/maps/api/js?v=3&sensor=false&language=en&callback=load_gmap';
				wf.type = 'text/javascript';
				wf.async = 'true';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(wf, s);			

				window.load_gmap = function() {
					$( '.google-maps' ).each(function() {

						var options = {
							map: {
								options: {
									zoom: $( this ).data( 'zoom' ) || 1, 
									center: [ $( this ).data( 'center-lat' ), $( this ).data( 'center-lng' ) ], 
									scrollwheel: false, 
									mapTypeControl: false, 
									streetViewControl: false, 
									styles: [
										{
											stylers: [
												{ saturation: -100 }
											]
										}
									]
								}
							}, 
							marker: {
								latLng:[ $( this ).data( 'marker-lat' ), $( this ).data( 'marker-lng' ) ]
							}
						};

						$( this ).gmap3( options );
					});
				}
			})();
		}

		/*	--------------------------------------------------------------------
		Flickr Widget
		------------------------------------------------------------------------ */
		if( $.fn.jflickrfeed ) {
			$( '.flickr-stream' ).each(function() {
				var flickrId = $( this ).data( 'flickr-id' );
				var limit = $( this ).data( 'limit' ) || 9;
				$( document.createElement( 'ul' ) )
					.prependTo( this ).jflickrfeed({
						qstrings: {
							id: flickrId
						}, 
						limit: limit, 
						itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
					});
			});
		}

		/* ==========================================================================
			Twitter Feed
		============================================================================= */
		if( $.fn.tweet ) {
			$( '.tweets' ).each(function() {
				var username = $( this ).data( 'twitter-username' );
				var count = $( this ).data( 'count' ) || 1;
				$( this ).tweet({
					username: username, 
					template: '{text}{time}', 
					count: count, 
					loading_text: 'Loading Tweets...'
				});
			});
		}

	});

	$( document ).ready(function() {

		/* ==========================================================================
			Define easeInOutExpo
		============================================================================= */
		$.extend($.easing, {
			easeInOutExpo: function (e, f, a, h, g) {
				if(f == 0) {
					return a
				}
				if(f == g) {
					return a + h
				}
				if((f /= g / 2) < 1) {
					return h / 2 * Math.pow(2, 10 * (f - 1)) + a
				}
				return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
			}
		});


		/* ==========================================================================
			Responsive Nav
		============================================================================= */
		(function() {
			if( typeof responsiveNav !== 'undefined' ) {
				var nav = responsiveNav( '#zw-nav', {
					insert: 'before', 
					animate: !$.isHandheld, 
					label: '<span></span>'
				});

				$( '#zw-nav' ).on( 'click', 'a', function() {
					if( $( '#nav-toggle' ).is( ':visible' ) ) {
						nav.toggle();
					}
				});
			}
		})();


		/* ==========================================================================
			Affix
		============================================================================= */
		$( '#zw-header' ).affix({
			offset: {
				top: function() {
					return 0;
				}
			}
		});


		/* ==========================================================================
			Parallax Blocks
		============================================================================= */

		if( $.fn.parallax ) {

			$( '.aside-block[data-background]' ).parallax({
				enableParallax: !$.isHandheld
			});
		}

		/* ==========================================================================
			ScrollTo
		============================================================================= */
		if( $.fn.scrollTo ) {
			$( '#zw-nav, #zw-header .brand, .slider-block .slide-link' ).on( 'click', 'a[href^="#"]', function(e) {
				var href = $( this ).attr( 'href' );
				var target = href === '#'? 0 : $( href );
				$( window ).scrollTo( target,  {
					duration: $.isHandheld? 0 : 400
				});
				e.preventDefault();
			});
		}


		/* ==========================================================================
			Slider Setup
		============================================================================= */
		if( $.fn.cycle ) {

			$( '.slider-block .cycle-slider' ).cycle({
				slides: '> .slide-wrap', 
				fx: 'scrollHorz', 
				speed: 1200, 
				swipe: true, 
				loader: 'wait', 
				easing: 'easeInOutExpo'
			}).on( 'cycle-before', function( e, hash, o, i, forward ) {

				var distance = $( window ).width() * 2, 
					oDistance = (forward? distance : -distance) + 'px', 
					iDistance = (forward? -distance : distance) + 'px', 
					oCaption = $( o ).find( '.caption-box' ), 
					iCaption = $( i ).find( '.caption-box' ), 
					animOpts = {
						'easing': 'easeInOutExpo', 
						'duration': 1200, 
						'complete': function() {
							$( this ).css( 'marginLeft', '' );
						}
					};

				oCaption.stop( true, true ).animate({ 'marginLeft': oDistance }, animOpts );
				iCaption.stop( true, true ).css( 'marginLeft', iDistance ).animate({ 'marginLeft': '0px' }, animOpts );
			});
		}

		/* Hacky Slider Height Fix - stupid IE! */
		if( /*@cc_on!@*/0 ) {
			(function() {
				function adjustSliderHeight() {
					$( '.slider-block' ).each(function() {
						$( this ).css( 'height', '' ).css( 'height', $( this ).parent().height() );
					});
				}
				adjustSliderHeight();
				$( window ).on( 'resize orientationchange', adjustSliderHeight );
			})();
		}
		

		/* ==========================================================================
			Portfolio Setup
		============================================================================= */
		if( $.fn.isotope && $.fn.imagesLoaded ) {

			(function() {
				function createPopupContent( data ) {
					return '<div class="item-detail item-popup-block clearfix">' + 
						'<div class="item-media ' + (data.enableslider? 'cycle-slider' : '') + '">' + 
							(data.enableslider? '<div class="cycle-next"></div><div class="cycle-prev"></div>' : '') + 
							(data.media? $.map( data.media, function( media ) {
								var result = '';
								switch( media.type ) {
									case 'image':
										result = '<img src="' + media.src + '" alt="" title="' + (media.title? media.title : '') + '">';
										break;
									case 'video':
										result = media.embed;
										break;
									default: 
										break;
								}

								return '<div class="media">' + result + '</div>';
							}).join( '' ) : '') + 
						'</div>' + 
						'<div class="item-info">' + 
							'<h3 class="title">' + data.title + '</h3>' + 
							data.description + 
							'<div class="clearfix">' + 
								'<a href="' + data.url + '" class="btn btn-primary view-work" target="_blank">View Work</a>' + 
								'<a href="#" class="item-like"><i class="icon-heart"></i>' + data.likes + '</a>' + 
							'</div>' + 
						'</div>' + 
					'</div>';
				}

				$( '.portfolio' ).each( function() {

					// Cache Variables
					$container = $( this ).find( '.items-wrap' );
					$filter =  $( this ).find( '.filter' );
					$filterActive = $( '<span class="active-label" data-toggle="dropdown"></span>' ).prependTo( $filter );

					if( $filter.data( 'label' ) ) {
						$filterActive.attr( 'data-label', $filter.data( 'label' ) );
					}

					$container.imagesLoaded(function() {

						// Initialize Isotope
						$( this ).isotope({
							itemSelector: '.item', 
							masonry: {
								columnWidth: $container.width() / 12
							}
						});

						// Handle Window Resize
						$( window ).on( 'smartresize orientationchange', function() {
							$container.isotope({
								masonry: {
									columnWidth: $container.width() / 12
								}
							});
						});

						// Handle Filtering
						$filter.on( 'click', 'a', function( e ) {

							$container.isotope({
								filter: $( this ).data( 'filter' )
							});
							$( this ).closest( 'li' ).addClass( 'active' ).siblings( 'li' ).removeClass( 'active' );
							$( '.active-label', $filter ).text( $( this ).text() );

							e.preventDefault();
						});

						$filter.find( 'li a[data-filter="*"]' ).parent().addClass( 'active' );
						$filterActive.text( $filter.find( 'li a[data-filter="*"]' ).text() );

						// Portfolio Popup
						if( $.fn.magnificPopup ) {
							$container.find( '.item .item-link' ).magnificPopup({
								type: 'ajax', 
								ajax: {
									settings: {
										cache: false
									}
								}, 
								removalDelay: 300, 
								mainClass: 'mfp-zoom-in', 
								overflowY: 'scroll', 
								callbacks: {
									parseAjax: function( jqXHR ) {
										var response = $.parseJSON( jqXHR.responseText );
										jqXHR.responseText = createPopupContent( response );
									}, 
									updateStatus: function( data ) {
										if( data.status === 'ready' ) {
											if( $.fn.fitVids ) {
												$( this.contentContainer ).find( '.item-popup-block .media' ).fitVids();
											}

											if( $.fn.cycle ) {
												$( this.contentContainer ).find( '.item-media.cycle-slider' ).cycle({
													slides: '> .media', 
													swipe: true
												});
											}
										}
									}, 
									close: function() {
										if( $.fn.cycle ) {
											$( this.contentContainer ).find( '.item-media.cycle-slider' ).cycle( 'destroy' );
										}
									}
								}
							});
						}

					});

				});
			})();
		}

		/* ==========================================================================
			LazyLoad Images
		============================================================================= */
		if( $.fn.lazyload ) {

			$( 'img[data-original]' ).lazyload({
				effect: 'fadeIn', 
				load: function() {
					$( this ).parent().addClass( 'lazyloaded' );
				}
			});
		}

		/* ==========================================================================
			FitVids Fluid Videos
		============================================================================= */
		if( $.fn.fitVids ) {
			$( '.media' ).fitVids();
		}


		/* ==========================================================================
			Placeholder Polyfill
		============================================================================= */
		if( $.fn.placeholder ) {
			$( 'input[placeholder], textarea[placeholder]' ).placeholder();
		}

		/* ==========================================================================
			Tooltips
		============================================================================= */
		if( $.fn.tooltip ) {
			$( '[rel="tooltip"]' ).tooltip();
		}


		/* ==========================================================================
			Alert
		============================================================================= */
		$( document ).on( 'click.alert', '.alert', function() {
			$( this ).animate({ 'opacity': 0 }, function() {
				$( this ).slideUp( function() {
					$( this ).remove();
				});
			});
		});


		/* ==========================================================================
			Recaptcha
		============================================================================= */
		if( typeof Recaptcha !== 'undefined' ) {

			var recaptcha_public_key = '6Leh0OASAAAAALCZcJgsNsfGw5Gl_xRDc_gpfZLH';
			Recaptcha.create( recaptcha_public_key, 'recaptcha', {
				theme: 'custom'
			});
		}


		/* ==========================================================================
			Contact Form
		============================================================================= */
		if( $.fn.validate && $.fn.ajaxSubmit ) {

			(function() {
				$( '#contact-form' ).validate({
					submitHandler: function( form ) {

						$( '.ajax-loader', form ).addClass( 'visible' );
						$( form ).ajaxSubmit(function( response ) {
							response = $.parseJSON( response );
							message = $( '.alert', form );
							if( !message.length ) {
								message = $( '<div class="alert"></div>' );
							}

							message
								.removeClass( 'alert-error alert-success alert-info' )
								.toggleClass( 'alert-error', !response.success )
								.toggleClass( 'alert-success', response.success )
								.html( response.message ).hide().prependTo( form ).slideDown();

							if( response.success ) {
								$( form ).resetForm();
							}

							if( typeof Recaptcha !== 'undefined' ) {
								Recaptcha.reload();
							}

							$( '.ajax-loader', form ).removeClass( 'visible' );
						});
					}
				});
			})();
		}

	});

}) ( jQuery, window, document );