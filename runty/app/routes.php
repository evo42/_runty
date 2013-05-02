<?php
/* routes.php is part of the Runty NoCMS project http://runtyapp.org
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

/*
// respond to all
respond(function () {
    echo 'Respond to all.';
});
*/

// runty app home screen
respond(array('POST','GET'), '/runty/?', function($request, $response) {
	echo 	'<h1 style="margin: 250px; text-align: center;font-family: Verdana;">
				<img src="./theme/ico/glyphicons_002_dog.png">&nbsp;</img> &nbsp; Runty. &nbsp; 
				<a style="color: black;" href="http://runtyapp.org"><b><em>No</em>CMS</b></a>
			</h1>';
});


// other routes
respond(array('POST','GET'), '/runty/support/?', function($request, $response) {
	echo 	'<h1 style="margin: 250px; text-align: center;font-family: Verdana;">
				<img src="./theme/ico/glyphicons_002_dog.png">&nbsp;</img> &nbsp; Runty. &nbsp; 
				<a style="color: black;" href="http://runtyapp.org"><b><em>No</em>CMS</b></a>
			</h1>
			
			<p>For support use the runty. NoCMS GitHub issues tracker or tag your question on stackoverflow with runty / nocms.</p>
			';
});
