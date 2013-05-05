<?php
/* core.php is part of the Runty. NoCMS project http://runtyapp.org
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

// runty app
session_start();
if (empty($runty)) {
    $runty = new stdClass();
}
$runty->core_path = dirname( __FILE__ );
$runty->host = $_SERVER['HTTP_HOST'];

// runty settings
if (empty($runty->settings)) {
    $runty->settings = new stdClass();
}

// load individual project config file
$require = array();
$require[] = $runty->core_path . '../settings.php';
$require[] = $runty->core_path . '../../.runty/settings.php';
$require[] = $runty->core_path . '/vendor/klein.php';
foreach($require as $require_path) {
	if (is_readable($require_path)) {
		require_once $require_path;
	}
}

// @todo http router


if (empty($_REQUEST['sign'])) {
	$_REQUEST['sign'] = false;
}
if (empty($_REQUEST['action'])) {
	$_REQUEST['action'] = false;
}


// sign-off / logout
if ($_REQUEST['sign'] == 'off' ||
    $_REQUEST['sign'] == 'out' ||
	$_REQUEST['action'] == 'sign-off' ||
	$_REQUEST['action'] == 'logout') {
	unset($_SESSION['user']);
}
