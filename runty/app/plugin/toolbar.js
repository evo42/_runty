/** toolbar **/
var toolbar = jQuery('<div id="runty-toolbar">'),
	actions = jQuery('<div id="runty-actions">');

/*toolbar.append('<strong>Runty</strong>');*/
actions.append('<strong>Runty</strong> ');
actions.append('<a href="#edit" id="runty-button-edit">edit</a>');
actions.append('<a href="#save" id="runty-button-save">save</a>');
actions.append('<a href="?logout" id="runty-button-logout">logout</a>');

toolbar.append(actions);

jQuery('#runty-info').prepend(toolbar);
//console.log(toolbar);

//jQuery( "a", "#runty-toolbar" ).button();

jQuery('#runty-button-edit').show();
jQuery('#runty-button-save').hide();


jQuery('#runty-button-save').bind('click', function() {
	//alert('Save the page content. To be done.');
	console.log('save page');
	
	jQuery('.runty-editable').mahalo();
	
	jQuery('.runty-editable').each(function() {
		var content = this.innerHTML;
		var contentId = this.id;
		var pageId = window.location.pathname;
		var draft = 'draft';

		//alert('save data ID: ' + contentId + ' -- ' + content);
		//console.log(Aloha.activeEditable.obj[0].id)
		console.log(pageId + ' -- ' + contentId + ' content: ' + content);
		
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
			jQuery("#log").html( msg );
			//alert( "Request OK: " + msg );
		});

		request.fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
		});
		
	});
	
	
	//jQuery('.aloha-editable').mahalo();
	
	jQuery('#runty-button-edit').show();
	jQuery('#runty-button-save').hide();
});

jQuery('#runty-button-edit').bind('click', function() {
	//alert('Edit the page content. To be done.');
	jQuery('.runty-editable').aloha();
	
	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
});
