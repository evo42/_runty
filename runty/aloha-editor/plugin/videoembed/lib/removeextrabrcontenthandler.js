define(
	['aloha', 'jquery', 'aloha/contenthandlermanager'],
	function(Aloha, jQuery, ContentHandlerManager) {
		"use strict";
	
		var RemoveExtraBrContentHandler = ContentHandlerManager.createHandler({
			/**
			 * Handle the pasting. Try to detect content pasted from word and transform to clean html
			 * @param content
			 */
			handleContent: function( content, options ) {
				options = options || {};
				if (options.command === 'getContents') {
					if (typeof content === 'string') {
						content = jQuery('<div>' + content + '</div>');
					} else if (content instanceof jQuery) {
						content = jQuery('<div>').append(content);
					}
					content.find('*:not(li)>br:last-child').remove();
					return content.html();
				}
				return content;
			}
		});
		return RemoveExtraBrContentHandler;
	});
