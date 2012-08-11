<?php
/* prepend.php is part of the Runty NoCMS project http://runtyapp.org
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

// load runty core
require_once dirname( __FILE__ ) . '/index.php';

// runty loader
function runty_loader( $buffer ) {
	// inject html, javascript & css into the page to load Runty

	// ToDo list:
	// @todo check if .runty/aloha-editor.js & /runty/aloha-editor/aloha-editor.js are available
	// @todo make theme config able
	// @todo include jquery just once (improve?)
	// @todo multilingual
	// @todo add guid as id attribute to all elements with class runty-editable and not id attr.

	// if check / update ids write buffer back to file
	$updateContentIds = true;
	if ($updateContentIds) {
		$update = updateContentIds($buffer);

		if ($update->updates > 0) {
			$buffer = $update->html;

			// @todo use config / check for tidy in env. / use custom html5-tidy
			$tidy_config = array(	'indent' => true,
									'output-xhtml' => true,
									'wrap' => 200);
			$tidy = new tidy();
			$buffer = $tidy->repairString($buffer, $tidy_config, 'utf8');

			// @todo make new name configureable / use git / use .runty/backup ?!
			rename($_SERVER['SCRIPT_FILENAME'], $_SERVER['SCRIPT_FILENAME'] . '.'.date('md-H').'.bak');
			if (file_put_contents($_SERVER['SCRIPT_FILENAME'], $buffer)) {
				$debug = 'OK: writing file';
			} else {
				$debug = 'ERROR: writing file';
			}
		}
	}


	// draft info
	$draft_file = $_SERVER['SCRIPT_FILENAME'];
	$draft_file = str_replace( $_SERVER['SCRIPT_NAME'], '/.runty/draft'.$_SERVER['SCRIPT_NAME'], $_SERVER['SCRIPT_FILENAME'] );
	$draft_url = '/.runty/draft'.$_SERVER['SCRIPT_NAME'];
	//$buffer = str_replace( "<body>", "<body>\n\n$draft_file\n\n", $buffer );
	if (is_readable($draft_file) && is_writeable($draft_file)) {
		$draft_msg = '<div id="runty-notice-draft"><span>A draft of this page is available.</span> <a href="'.$draft_url.'">Edit draft</a></div>';
		$buffer = str_replace( "<body>", "<body>\n\n$draft_msg\n\n", $buffer );
	}
	

	// editing with aloha editor
	// 'http://cdn.aloha-editor.org/latest/' -- '/runty/aloha-editor/0.21/'
	$aloha_url = '/runty/aloha-editor/0.21/'; 
	$aloha = '
		<link rel="stylesheet" href="/runty/theme/css/runty.css" type="text/css">
		<link rel="stylesheet" href="'.$aloha_url.'css/aloha.css" type="text/css">

		<script src="/runty/aloha-editor/aloha-editor.js"></script>
		<script src="/.runty/aloha-editor.js"></script>

		<script src="'.$aloha_url.'lib/aloha.js" ></script>

		<script type="text/javascript">
		Aloha.ready( function() {
			Aloha.jQuery(".runty-editable").aloha();

			if ( typeof Aloha != "undefined" ) {
				jQuery("#runty-button-edit").hide();
				jQuery("#runty-button-save").show();
			} else {
				jQuery("#runty-button-edit").show();
				jQuery("#runty-button-save").hide();
			}
		});
		</script>
	';

	// require
	// http://cdn.aloha-editor.org/latest/lib/aloha.js
	// http://requirejs.org/docs/release/2.0.5/minified/require.js
	$requirejs = '
		<script src="'.$aloha_url.'lib/require.js"></script>
	';

	// jquery
	// http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
	$jquery_url = $aloha_url.'lib/vendor/jquery-1.7.2.js';
	$jquery = '
		<script src="'.$jquery_url.'"></script>
	';

	// runty toolbar
	$toolbar = '
		<script src="/runty/plugin/toolbar.js"></script>
	';

	// @todo check for https/http / add local copy
	$browserid = '
		<script src="http://browserid.org/include.js" type="text/javascript"></script>

		<script type="text/javascript">
		$(function() {
			$("#browserid").click(function() {
				navigator.id.get(gotAssertion);
				return false;
			});
		});

		function gotAssertion(assertion) {
			// got an assertion, now send it up to the server for verification
			if (assertion !== null) {
				$.ajax({
					type: "POST",
					url: "./runty/authentication.php",
					data: { assertion: assertion },
					success: function(res, status, xhr) {
						checkLogin(res);
					},
					error: function(res, status, xhr) {
						if (window.console) {
							window.console.log("login failure" + res);
						}
					}
				});
			} else {
				//loggedOut();
			}
		}

		function checkLogin(res) {
			var obj = jQuery.parseJSON(res);
			if (obj.status === "okay") {
				//$("#browserid").fadeOut();
				document.location.href=document.location.origin + document.location.pathname;
			}
		}
		</script>
	';

	$login = '
		<div id="runty-authenticate">
			<span><a href="#" id="browserid" title="Sign-in with BrowserID">
				<img src="http://browserid.org/i/sign_in_blue.png" alt="Sign in" />
			</a></span>
		</div>
	';

	if (empty($_REQUEST['sign'])) {
		$_REQUEST['sign'] = false;
	}
	if (empty($_REQUEST['action'])) {
		$_REQUEST['action'] = false;
	}

	// sign-off / logout
	if ($_REQUEST['sign'] == 'off' ||
		$_REQUEST['action'] == 'sign-off' ||
		$_REQUEST['action'] == 'logout') {
		unset($_SESSION['user']);
	}

	// @todo proper regex
	if (!strpos($buffer, 'require.js') &&
		!strpos($buffer, 'require.min.js')) {
		$buffer = str_replace( "<head>", "<head>\n\n$requirejs\n\n", $buffer );
	}

	// @todo proper regex
	if (!strpos($buffer, 'jquery.js') &&
		!strpos($buffer, 'jquery.min.js') &&
		!strpos($buffer, 'jquery-1.7.2.js')) {
		$buffer = str_replace( "<head>", "<head>\n\n$jquery\n\n", $buffer );
	}

	/*
	$debug = '';
	foreach ($_SERVER as $k => $v) {
		$debug .= $k.': '.$v.'<br /> '."\n\n";
	}
	$buffer = str_replace( "<body>", "<body>\n\n$debug\n\n", $buffer );
	// */

	/*
	// user session object
	//
	[user] => stdClass Object (
		[status] => okay
		[email] => user@example.org
		[audience] => http://runty
		[expires] => 1344622215675
		[issuer] => login.persona.org
		[context] => http://runtyapp.org/person
		[id] => user@example.org
		[name] => Example Username
		[role] => editor
		[member] => http://runtyapp.org/admin
	)
	*/
	if ( !empty($_SESSION['user']) ) {

		if (empty($_SESSION['user']->email)) {
			$buffer = str_replace( "</body>", "\n\n$browserid\n\n</body>", $buffer );
			$buffer = str_replace( "</body>", "\n\n$login\n\n</body>", $buffer );
			return ( $buffer );
		} else {
			$buffer = str_replace( "</body>", "\n\n$toolbar\n\n</body>", $buffer );
		}

		if ($_SESSION['user']->role == 'admin' || $_SESSION['user']->role == 'editor') {
			$buffer = str_replace( "</body>", "\n\n$aloha\n\n</body>", $buffer );
		}

		return ( $buffer );
	} else {
		$buffer = str_replace( "</body>", "\n\n$browserid\n\n</body>", $buffer );
		$buffer = str_replace( "</body>", "\n\n$login\n\n</body>", $buffer );
		return ( $buffer );
	}
}


// call runty_loader callback function
ob_start( 'runty_loader' );

// tidy contents in order to get valid html
// @todo test if tidy is supported / config -- use global tidy config
ob_start( 'ob_tidyhandler' );


function updateContentIds($content) {
	require_once dirname( __FILE__ ) . '/vendor/simple_html_dom.php';

	$html = str_get_html($content);
	$updates = 0;
	foreach($html->find('.runty-editable') as $editable) {
		if (empty($editable->id)) {
			$editable->id = 'runty-'.sha1(microtime()*rand(5, 15));
			$updates++;
		}
	}
	
	$html = str_replace( "<body>", "<body>\n\n$debug\n\n", $html );
	
	$return = new stdClass();
	$return->html = $html;
	$return->updates = $updates;
	return $return;
}
?>