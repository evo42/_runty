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
actions.append("<a href=\"#runty\" id=\"runty-button-icon\"><span><img alt=\"Runty NoCMS\" title=\"Runty NoCMS\" src=\"/theme/images/icons/glyphicons_002_dog.png\"></span></a> ");
actions.append("&nbsp;");
actions.append("<a href=\"#edit\" id=\"runty-button-edit\"><span><img alt=\"Edit\" title=\"Edit\" src=\"/theme/images/icons/glyphicons_030_pencil.png\"></span></a> ");
actions.append("<a href=\"#save\" id=\"runty-button-save\"><span><img alt=\"Save\" title=\"Save\" src=\"/theme/images/icons/glyphicons_198_ok.png\"></span></a> ");
actions.append("&nbsp;");
actions.append("<a href=\"#draft\" id=\"runty-button-draft\"><span><img alt=\"Edit draft\" title=\"Edit draft\" src=\"/theme/images/icons/glyphicons_057_history.png\"></span></a> &nbsp;");
actions.append("<a href=\"?sign=off\" id=\"runty-button-logout\"><span><img alt=\"Sign-off\" title=\"Sign-off\" src=\"/theme/images/icons/glyphicons_240_rotation_lock.png\"></span></a>");
toolbar.append(actions);

jQuery('body').prepend(toolbar);
//jQuery('#runty-button-draft').hide();

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
			url: "/runty/store.php",
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

	jQuery('#runty-button-edit').show();
	jQuery('#runty-button-save').hide();
});

jQuery('#runty-button-edit').bind('click', function() {
	jQuery('.runty-editable').aloha();

	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
});

jQuery('#runty-button-draft').bind('click', function() {
	// get url from draft and redirect to page or load data into current page ...
	//jQuery('#runty-notice-draft a');
});
