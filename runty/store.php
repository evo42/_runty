<?php
/* store.php is part of the Runty NoCMS project http://runtyapp.org
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

require_once '../index.php';


// update a backend store

// can be a key-value store like redis
// a data base like sqlite or postgresql
// html5 local storage


// or


//DOM
require_once '../vendor/JSLikeHTMLElement.php';

// check authentication
if (empty($_SESSION['user']->id)) {
	die('Runty Auth: User not authenticated');
}


// @todo draft mode
if (isset($_REQUEST['version']) && $_REQUEST['version'] == 'draft') {
	$draft = true;
} else {
	$draft = false;
}

if ($runty->settings->draft) {
	$draft = true;
}

// Save Data
$msg = '';

// XSS handling required
$pageId = false;
$contentId = false;
$content =  false;

if (isset($_REQUEST['pageId'])) {
	$pageId = $_REQUEST['pageId'];
	$contentId = $_REQUEST['contentId'];
	$content =  $_REQUEST['content'];
} else {
	exit;
}

// @todo test / improve regex
//$filePath = preg_replace('%^(/*)[^/]+%', '$2..', $pageId);
$filePath = '..'.$pageId;
$draftFilePath = '../.runty/draft'.$pageId;

$pageContent = file_get_contents($filePath);
$error = false;

$doc = new DOMDocument();
//$doc->resolveExternals = true;
$doc->registerNodeClass('DOMElement', 'JSLikeHTMLElement');
if (!$doc->loadHTML($pageContent)) {
	$error = 'Could not load HTML: ';
	$error .= $pageContent;
} else {
	$elem = $doc->getElementById($contentId);

	// set innerHTML
	$elem->innerHTML = $content;

	$msg = 'Saved as: '.$filePath;
	if ($draft) {
		$filePath = $draftFilePath;
		$msg = 'Saved as Draft: '.$filePath;
	}
	if (!file_put_contents($filePath, $doc->saveHTML())) {
		$error = $msg = 'Could not update file: '.$filePath;
	}
}

// @todo output as json(-ld) format
if ( !empty($error) ) {
	//error_log("\nerror: ".print_r($error, true), 3, "cms.log");
	print_r($error);
} else {
	//error_log("\OK. Content saved. ".$msg, 3, "cms.log");
	echo $msg;
}
?>