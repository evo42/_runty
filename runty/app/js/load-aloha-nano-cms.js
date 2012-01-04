/*
	jQuery

	Here we add our own jQuery version for demonstration usage.
	You can also just use the jQuery version delivered with Aloha Editor.
*/
loadJS('assets/js/jquery-1.7.min.js');

/* 
	Aloha Editor

	First we add our configuration.
	The configuration is not needed by default but handy to configure Aloha to your needs.

	The second step is to include aloha.js and define the desired plugins in the "data-aloha-plugins" attribute.
	In this Demo we also load a custom plugin from our Aloha Editor Nano CMS bundle (defined in the configuration).

	And the final step is to include the needed stylesheet for Aloha Editor.
*/
loadJS('assets/aloha-config/minimal.js');

loadJS('assets/aloha-editor/aloha/lib/aloha.js', 	'common/format, \
													common/table, \
													common/list, \
													common/link,  \
													common/highlighteditables, \
													common/block, \
													common/undo, \
													common/paste, \
													common/commands, \
													common/abbr, \
													common/image,  \
													common/contenthandler, \
													extra/browser, \
													extra/linkbrowser, \
													cmsplugin/cms');

loadCSS('assets/aloha-editor/aloha/css/aloha.css');


//setTimeout(function() {

/*
	Bootstrap JS / CSS

	This is part of the Twitter Bootstrap Toolkit used for a nice look and feel
	See: http://twitter.github.com/bootstrap/ 
*/
loadCSS('assets/css/bootstrap.css');
loadJS('assets/js/bootstrap/bootstrap-alerts.js');
loadJS('assets/js/bootstrap/bootstrap-buttons.js');
loadJS('assets/js/bootstrap/bootstrap-dropdown.js');
loadJS('assets/js/bootstrap/bootstrap-modal.js');
loadJS('assets/js/bootstrap/bootstrap-twipsy.js');
loadJS('assets/js/bootstrap/bootstrap-popover.js');
loadJS('assets/js/bootstrap/bootstrap-scrollspy.js');
loadJS('assets/js/bootstrap/bootstrap-tabs.js');



/*
	Aloha Editor Nano CMS

	The following files should act as a simple example how to use Aloha Editor with a backend to store and read data.
	Theres no user authentication so use this scripts just for educational purposes. Not for production Sites!
*/
/*
	This file includes all application specific styles for the UI
*/
loadJS('assets/js/aloha-nano-cms.js');

/*
	This file handles some functionality for our "Aloha Editor Nano CMS"

	We provide functionality to edit / save changes of a page (all editables at once)
	...
*/
loadCSS('assets/css/aloha-nano-cms.css');


/*
	In this file we handle the storage of content edited with Aloha Editor.

	When an editable is deactivated the content of that editable is sent to the server.
	On the server a PHP backend script saves the data to our database (sqlite).
	Note: There's no user authentication available! Use it not on production sites.

	Note: If you don't want to enable saving on every deactivation of an editable
	you can disable this script and use the "save button" provided with aloha-cms.js
*/
loadJS('assets/js/aloha-save-to-db.js');
loadJS('assets/js/aloha-save-to-file.js');

/*
	In this file we handle reading of content for editables from a database.

	When a page is loaded we read the data for all editables for that page from a database and update the HTML.
	On the server we read the database and send the results to the client.
	Note: This just shows how it can be used and we do not care about SEO / disabled JavaScript on the client.
*/
//loadJS('assets/js/aloha-read-from-db.js');

//}, 1000);


/**
 * helpers ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

/**
 * insert a css script tag into the head of a html page
*/
function loadCSS( href, media ) {
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = href;
	if ( media ) {
		cssNode.media = media;
	}
	
	headID.appendChild(cssNode);
}

/**
 * insert a js script tag into the head of a html page
*/
function loadJS( src, plugins ) {
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	
	newScript.type = 'text/javascript';
	newScript.src = src;
	if ( plugins ) {
		newScript.setAttribute('data-aloha-plugins', plugins);
	}
	
	headID.appendChild(newScript);
}