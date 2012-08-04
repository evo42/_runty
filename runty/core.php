<?php
/* runty-core.php is part of the Runty NoCMS project http://aloha-editor.org/runty
 *
 * Runty is a handy NoCMS utilizing the Aloha Editor
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */

$runty = new stdClass;
$runty->core_path = dirname( __FILE__ );


// load individual project config file
//require_once '../.runty/config.php';


// load authentication library
require_once $runty->core_path . '/authentication.php';
//require_once $runty->core_path . '/repository-local.php';
//require_once $runty->core_path . '/update-dom.php';


$request_method = false;

// route request
switch ( $request_method ) {

	case 'query':
		// \runty\repository\query( );
		break;

	case 'store':
		break;
	
}
