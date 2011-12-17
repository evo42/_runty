// Aloha Editor Nano CMS logic

$(document).ready(function() {
	// here jQuery 1.7 (non Aloha) is used
	//console.log('jQuery: ' + $().jquery);
	
	// hide the save button on startup
	$('#save-page').hide();
	
	// hide the log message container
	$("#log").hide();
	
	// load navigation
	$(".nav").load("./sitemap.html #sitemap li");
	// and set active navigation item
	setTimeout("setActiveNavItem()",100);
	
	// load title
	$("#brand").load("./sitemap.html #brand a");
	
	// load footer
	$("#footer").load("./sitemap.html #footer p");
	
	
	// create page
	jQuery('#btn-create-page-abort').bind('click', function() {
		jQuery('#modal-create-page').modal('hide');
	});
	
	jQuery('#btn-create-page').bind('click', function() {
		//alert('Edit the page content. To be done.');
		
		var tpl = jQuery('#create-page-template').val();
		var name = jQuery('#create-page-name').val();
		
		if ( tpl && name ) {
			var request = jQuery.ajax({
				url: "app/create-page.php",
				type: "POST",
				data: {
					template : tpl,
					filename : name
				},
				dataType: "html"
			});

			request.done(function(msg) {
				jQuery("#log").html( msg );
				//alert( "Request OK: " + msg );
				document.location.href = msg;
			});

			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});
		}
	});
	
	
	// hide create-page on every page except sitemap
	if ('/sitemap.html' != getFilename(window.location.pathname)) {
		$("#create-page").hide();
	} else {
		$("#create-page").show();
	}
	
});


Aloha.ready(function() {
	Aloha.require( ['aloha', 'aloha/jquery' ], function( Aloha, jQuery ) {
		// here jQuery 1.6 from Aloha is used
		//console.log('Aloha jQuery: ' + jQuery().jquery);
		
		jQuery('#aloha-loading').hide();
		/*
		// using bootstrap js modal
		jQuery('#create-page').bind('click', function() {
			alert('Create a new page from a template. To be done.');
		});*/
	
		jQuery('#save-page').bind('click', function() {
			//alert('Save the page content. To be done.');
			console.log('save page');
			
			jQuery('.aloha-nano-cms-editable').mahalo();
			
			jQuery('.aloha-nano-cms-editable').each(function() {
				var content = this.innerHTML;
				var contentId = this.id;
				var pageId = window.location.pathname;

				//alert('save data ID: ' + contentId + ' -- ' + content);
				//console.log(Aloha.activeEditable.obj[0].id)
				console.log(pageId + ' -- ' + contentId + ' content: ' + content);
				
				// @todo just send one request with all contentIds + data as array
				var request = jQuery.ajax({
					url: "app/save-to-file.php",
					type: "POST",
					data: {
						content : content,
						contentId : contentId,
						pageId : pageId
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
			
			jQuery('#edit-page').show();
			jQuery('#save-page').hide();
		});
	
		jQuery('#edit-page').bind('click', function() {
			//alert('Edit the page content. To be done.');
			jQuery('.aloha-nano-cms-editable').aloha();
			
			jQuery('#edit-page').hide();
			jQuery('#save-page').show();
		});
		
		
	
	});
});

function setActiveNavItem() {
	
	//console.log('page ' +getFilename(window.location.pathname));
	$(".nav li").each(function() {
		//console.log('current ' + getFilename($(this).find('a').attr('href')));
		if (getFilename($(this).find('a').attr('href')) == getFilename(window.location.pathname)) {
			$(this).addClass( 'active' );
		}
	});
}

function getFilename( path ) {
	var filename = './',
		index = path.lastIndexOf("/");
	
	if ( index ) {
		filename = path.substr( index );
	}
	
	return filename.toLowerCase();
}
