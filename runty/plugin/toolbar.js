/* toolbar.js is part of the Runty NoCMS project http://runtyapp.org
*
* Runty is a handy NoCMS utilizing the power of Aloha Editor
* -- a modern WYSIWYG HTML5 inline editing library and editor.
*
*
* Runty is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or any later version.
*
* Runty is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*
* Online: https://www.gnu.org/licenses/gpl-2.0.html
*/

/** toolbar **/
var toolbar = jQuery('<div id="runty-toolbar">'),
	actions = jQuery('<div id="runty-actions">');

// @todo icons into runty
// @todo config options
actions.append("<a href=\"#runty\" id=\"runty-button-icon\"><span><img alt=\"Runty NoCMS\" title=\"Runty NoCMS\" src=\"/runty/theme/ico/glyphicons_002_dog.png\"></span></a>");
actions.append("<a href=\"#draft-public\" id=\"runty-button-draft-public\"><span><img alt=\"Public version\" title=\"Public version\" src=\"/runty/theme/ico/glyphicons_340_globe.png\"></span></a>");
actions.append("<a href=\"#edit\" id=\"runty-button-edit\"><span><img alt=\"Edit\" title=\"Edit\" src=\"/runty/theme/ico/glyphicons_030_pencil.png\"></span></a>");
actions.append("<a href=\"#save\" id=\"runty-button-save\"><span><img alt=\"Save\" title=\"Save\" src=\"/runty/theme/ico/glyphicons_198_ok.png\"></span></a>");
actions.append("<a href=\"#draft\" id=\"runty-button-draft\"><span><img alt=\"Edit draft\" title=\"Edit draft\" src=\"/runty/theme/ico/glyphicons_057_history.png\"></span></a>");
actions.append("<a href=\"#draft-publish\" id=\"runty-button-draft-publish\"><span><img alt=\"Publish draft\" title=\"Publish draft\" src=\"/runty/theme/ico/glyphicons_073_signal.png\"></span></a>");
actions.append("<a href=\"#draft-edit\" id=\"runty-button-draft-edit\"><span><img alt=\"Edit draft\" title=\"Edit draft\" src=\"/runty/theme/ico/glyphicons_151_edit.png\"></span></a>");
actions.append("<a href=\"#draft-remove\" id=\"runty-button-draft-remove\"><span><img alt=\"Remove draft\" title=\"Remove draft\" src=\"/runty/theme/ico/glyphicons_197_remove.png\"></span></a>");
actions.append("<a href=\"?sign=off\" id=\"runty-button-logout\"><span><img alt=\"Sign-off\" title=\"Sign-off\" src=\"/runty/theme/ico/glyphicons_240_rotation_lock.png\"></span></a>");
toolbar.append(actions);

jQuery('body').prepend(toolbar);

// hide some buttons on startup
jQuery('#runty-button-save').hide();
jQuery('#runty-button-edit').hide();
jQuery('#runty-button-draft').hide();
jQuery('#runty-button-draft-publish').hide();
jQuery('#runty-button-draft-public').hide();
jQuery('#runty-button-draft-edit').hide();
jQuery('#runty-button-draft-remove').hide();


// @todo check for draft version
var isDraftVersion = false;
var isDraftDraft = new RegExp('/.runty/draft/.runty/draft/').test(window.location.pathname);
if (isDraftDraft != false) {
	var request = jQuery.ajax({
		url: "/.runty/draft" + window.location.pathname,
		type: "GET",
		dataType: "html"
	});
	request.done(function(msg) {
		//jQuery('#runty-button-draft').show();
		// @todo disable overwriting (editing) from live version over existing draft version
		// jQuery('#runty-button-edit').hide();
		isDraftVersion = true;
		if (window.console) {
			window.console.log( "Runty: no draft version." + msg );
		}
	});
	request.fail(function(jqXHR, msg) {
		if (window.console) {
			window.console.log( "Runty: draft available " + msg );
		}
	});
}

var draftPublish = new RegExp('/.runty/draft/').test(window.location.pathname);
if (draftPublish) {
	jQuery('#runty-button-draft-publish').show();
	jQuery('#runty-button-draft-public').show();
	jQuery("#runty-button-draft-remove").show();
}

jQuery('#runty-button-save').bind('click', function() {
	jQuery('.runty-editable').mahalo();

	jQuery('.runty-editable').each(function() {
		var content = this.innerHTML;
		var contentId = this.id;
		var pageId = window.location.pathname;
		var version = 'draft';

		// @todo just send one request with all contentIds + data as array
		// @todo switch to datatype json
		//console.log(pageId + ' -- ' + contentId + ' content: ' + content);
		var request = jQuery.ajax({
			url: "/runty/app/store.php",
			type: "POST",
			data: {
				content : content,
				contentId : contentId,
				pageId : pageId,
				version: version
			},
			dataType: "html"
		});

		request.done(function(msg) {
			if (window.console) {
				window.console.log( "Request OK: " + msg );
			}
		});

		request.fail(function(jqXHR, msg) {
			if (window.console) {
				window.console.log( "Request failed: " + msg );
			}
		});
	});

	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').hide();
});

jQuery('#runty-button-edit').bind('click', function() {
	jQuery('.runty-editable').aloha();

	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
});

jQuery('#runty-button-draft').bind('click', function() {
	// @todo instead of redirect pull data from draft into current page
	var draftHref = jQuery('#runty-notice-draft a').attr('href');
	window.location.href = draftHref;
});

jQuery('#runty-button-draft-publish').bind('click', function() {
	
	// @todo save first ... (maybe user changed something...)
	
	// @todo publish draft (and create backup before...)
	var publishHref = window.location.pathname.replace(/\/.runty\/draft\//g, '/');

	var request = jQuery.ajax({
		url: "/runty/draft/publish" + publishHref,
		type: "GET",
		dataType: "html"
	});
	request.done(function(msg) {
		window.location.href = publishHref;
	});
	request.fail(function(jqXHR, msg) {
		if (window.console) {
			window.console.log( "Runty: publishing failed " + msg );
		}
	});
});

jQuery('#runty-button-draft-public').bind('click', function() {
	var publicHref = window.location.pathname.replace(/\/.runty\/draft\//g, '/');
	window.location.href = publicHref;
});

jQuery('#runty-button-draft-edit').bind('click', function() {
	// @todo publish draft (and create backup before...)
	var draftHref = '/.runty/draft' + window.location.pathname.replace(/\/.runty\/draft\//g, '/');
	window.location.href = draftHref;
});

jQuery('#runty-button-draft-remove').bind('click', function() {
	// @todo publish draft (and create backup before...)
	var draftHref = window.location.pathname.replace(/\/.runty\/draft\//g, '/');

	var request = jQuery.ajax({
		url: "/runty/draft/remove" + draftHref,
		type: "GET",
		dataType: "html"
	});
	request.done(function(msg) {
		window.location.href = draftHref;
	});
	request.fail(function(jqXHR, msg) {
		if (window.console) {
			window.console.log( "Runty: remove draft failed " + msg );
		}
	});
});

