define(
['aloha', 'jquery', 'aloha/contenthandlermanager'],
function(Aloha, jQuery, ContentHandlerManager) {
	"use strict";
    var OEmbedProvider = function (name, type, urlschemesarray, apiendpoint, callbackparameter) {
        this.name = name;
        this.type = type; // "photo", "video", "link", "rich", null
        this.urlschemes = urlschemesarray;
        this.apiendpoint = apiendpoint;
        this.callbackparameter = callbackparameter;
        this.maxWidth = 500;
        this.maxHeight = 400;
        var i, property, regExp;

        this.matches = function (externalUrl) {
            for (i = 0; i < this.urlschemes.length; i++) {
                regExp = new RegExp(this.urlschemes[i], "i");
                var ret=externalUrl.match(regExp);
                if (ret != null)
                    return ret;
            }
            return false;
        };

    };

    /* Native & common providers */
    var providers = [
		new OEmbedProvider("youtube", "video", ["^[^\\sy]*youtube\\.com/watch.+v=([\\w-]+)(.+t=(([\\d]+)m)?([\\d]+)s)?(.+end=([\\d]+))?(.+list=([\\w\\d]+))?\\S*$", "^[^\sy]*youtu\\.be/([\\w-]+)(.+t=(([\\d]+)m)?([\\d]+)s)?(.+end=([\\d]+))?(.+list=([\\w\\d]+))?\\S*$"]), // "http://www.youtube.com/videoembed"	(no jsonp)
		new OEmbedProvider("blip", "video", ["^[^\\sb]*blip\\.tv/play/([\\w\%-]+)\\.(x|html)\\S*$"])
	];
	/**
	 * Register the word paste handler
	 */
	var VideoEmbedContentHandler = ContentHandlerManager.createHandler({
		/**
		 * Handle the pasting. Try to detect content pasted from word and transform to clean html
		 * @param content
		 */
		handleContent: function( content ) {
			if ( typeof content === 'string' ){
				var match = providers[0].matches(content);
				if (match) {
					var params = new Array();
					if (match[5]) {
						params.push("start="+((match[4]?(parseInt(match[4])*60):0) + parseInt(match[5])));
					}
					if (match[6]) {
						params.push("end="+match[7]);
					}
					if (match[8]) {
						params.push("list=" + match[9]);
					}
					if (params.length>0) {
						params = "?" + params.join("&");
					} else {
						params = "";
					}
					
					content = '<iframe src="http://www.youtube.com/embed/'+match[1]+params+'" frameborder="0" allowfullscreen></iframe>';
				} else {
					match = providers[1].matches(content);
					if (match) {						
						content = '<iframe src="http://blip.tv/play/'+match[1]+'.x" frameborder="0" allowfullscreen></iframe>';
					} else {
						if (content.match(/(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)) {
							return jQuery('<div><a href="'+content+'">' + content + '</a></div>').html();
						}
					}
				}
				content = jQuery( '<div>' + content + '</div>' );
			} else if ( content instanceof jQuery ) {
				content = jQuery( '<div>' ).append(content);
			}

			return content.html();
		}
	});
	
	return VideoEmbedContentHandler;
});
