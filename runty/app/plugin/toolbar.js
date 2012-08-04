/** toolbar **/
var toolbar = jQuery('<div id="runty-toolbar">'),
	actions = jQuery('<div id="runty-actions">');

//actions.append('<strong>Runty</strong> ');
actions.append("<a href=\"?edit=on\" id=\"runty-button-edit\"><span><img alt=\"Edit\" title=\"Edit\" src=\"./theme/images/icons/glyphicons_030_pencil.png\"></span></a> ");
actions.append("<a href=\"?edit=off\" id=\"runty-button-save\"><span><img alt=\"Save\" title=\"Save\" src=\"./theme/images/icons/glyphicons_198_ok.png\"></span></a> ");
actions.append("&nbsp;");
actions.append("<a href=\"?sign=off\" id=\"runty-button-logout\"><span><img alt=\"Sign-off\" title=\"Sign-off\" src=\"./theme/images/icons/glyphicons_240_rotation_lock.png\"></span></a>");


toolbar.append(actions);


// @todo config
jQuery('body').prepend(toolbar);

//console.log(toolbar);

//jQuery( "a", "#runty-toolbar" ).button();
//console.log(Aloha);
if ( typeof Aloha != 'undefined' ) {
	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
} else {
	jQuery('#runty-button-edit').show();
	jQuery('#runty-button-save').hide();
}


jQuery('#runty-button-save').bind('click', function() {
	//console.log('save page');
	
	jQuery('.runty-editable').mahalo();
	
	jQuery('.runty-editable').each(function() {
		var content = this.innerHTML;
		var contentId = this.id;
		var pageId = window.location.pathname;
		var draft = 'draft';

		//console.log(pageId + ' -- ' + contentId + ' content: ' + content);
		
		// @todo just send one request with all contentIds + data as array
		// @todo update-dom or update-draft or update-session
		var request = jQuery.ajax({
			url: "../runty/update-dom.php",
			type: "POST",
			data: {
				content : content,
				contentId : contentId,
				pageId : pageId,
				draft: draft
			},
			dataType: "html"
		});

		request.done(function(msg) {
			//jQuery("#log").html( msg );
		});

		request.fail(function(jqXHR, textStatus) {
			//alert( "Request failed: " + textStatus );
		});
		
	});
	
	
	//jQuery('.aloha-editable').mahalo();
	
	jQuery('#runty-button-edit').show();
	jQuery('#runty-button-save').hide();
});

jQuery('#runty-button-edit').bind('click', function() {
	jQuery('.runty-editable').aloha();
	
	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
});

