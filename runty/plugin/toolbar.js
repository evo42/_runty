/* toolbar.js is part of the Runty. The NoCMS project http://runtyapp.org
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

//actions.append("<a href=\"/runty/\" id=\"runty-button-icon\"><span><img alt=\"Runty. The NoCMS\" title=\"Runty. The NoCMS\" src=\"/runty/theme/ico/glyphicons_002_dog.png\"></span></a>");
actions.append("<a href=\"/runty/\" id=\"runty-gravatar-icon\"><span><img id=\"runty-user-gravatar\" width=\"26px\" height=\"26px\" alt=\"User\" title=\"User\" src=\"https://en.gravatar.com/avatar/" + md5(runtyUserEmail) + "\"></span></a>");
actions.append("<a style=\"display:none\" href=\"#edit\" id=\"runty-button-edit\"><span><img alt=\"Edit\" title=\"Edit\" src=\"/runty/theme/ico/glyphicons_030_pencil.png\"></span></a>");
actions.append("<a style=\"display:none\" href=\"#save\" id=\"runty-button-save\"><span><img alt=\"Save\" title=\"Save\" src=\"/runty/theme/ico/glyphicons_198_ok.png\"></span></a>");
actions.append("<a style=\"display:none\" href=\"#resize\" id=\"runty-button-resize\"><span><img alt=\"Resize view port\" title=\"Resize view port\" src=\"/runty/theme/ico/glyphicons_086_display.png\"></span></a>")
//actions.append("<a href=\"/runty/?sign=off\" id=\"runty-button-logout\"><span><img alt=\"Sign-off\" title=\"Sign-off\" src=\"/runty/theme/ico/glyphicons_240_rotation_lock.png\"></span></a>");
toolbar.append(actions);

jQuery('body').prepend(toolbar);

// hide some buttons on startup
jQuery('#runty-button-save').hide();
jQuery('#runty-button-edit').hide();
jQuery('#runty-button-resize').show();

jQuery('#runty-button-resize').click(function(){void((function(d){if(self!=top||d.getElementById('toolbar')&&d.getElementById('toolbar').getAttribute('data-resizer'))return false;d.write('<!DOCTYPE HTML><html style="opacity:0;"><head><meta charset="utf-8"/></head><body><a data-viewport="320x480" data-icon="mobile">Mobile (e.g. Apple iPhone)</a><a data-viewport="320x568" data-icon="mobile" data-version="5">Apple iPhone 5</a><a data-viewport="600x800" data-icon="small-tablet">Small Tablet</a><a data-viewport="768x1024" data-icon="tablet">Tablet (e.g. Apple iPad 2-3rd, mini)</a><a data-viewport="1280x800" data-icon="notebook">Widescreen</a><script src="http://lab.maltewassermann.com/viewport-resizer/resizer.min.js"></script></body></html>')})(document))});

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
				//window.console.log( "Request OK: " + msg );
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
	jQuery('#runty-button-resize').show();
});

jQuery('#runty-button-edit').bind('click', function() {
	jQuery('.runty-editable').aloha();

	jQuery('#runty-button-edit').hide();
	jQuery('#runty-button-save').show();
	jQuery('#runty-button-resize').show();
});


