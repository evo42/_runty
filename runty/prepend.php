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
	// @todo check if .runty/aloha-editor.js & ../runty/aloha-editor/aloha-editor.js are available
	// @todo make theme config able
	// @todo include jquery just once (improve?)
	// @todo multilingual
	// @todo add guid as id attribute to all elements with class runty-editable and not id attr.


	// editing with aloha editor
	$aloha = '
		<link rel="stylesheet" href="../runty/theme/css/runty.css" type="text/css">
		<link rel="stylesheet" href="http://cdn.aloha-editor.org/latest/css/aloha.css" type="text/css">

		<script src="../runty/aloha-editor/aloha-editor.js"></script>
		<script src="../.runty/aloha-editor.js"></script>

		<script src="http://cdn.aloha-editor.org/latest/lib/require.js" ></script>
		<script src="http://cdn.aloha-editor.org/latest/lib/aloha.js" ></script>

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

	// jquery
	$jquery = '
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	';

	// runty toolbar
	$toolbar = '
		<script src="../runty/plugin/toolbar.js"></script>;
	';

	// @todo check for https/http
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

	// sign-off / logout
	if ($_REQUEST['sign'] == 'off' ||
		$_REQUEST['action'] == 'sign-off' ||
		$_REQUEST['action'] == 'logout') {
		unset($_SESSION['user']);
	}

	// @todo proper regex
	if (false === strpos($buffer, 'jquery.js') ||
		false === strpos($buffer, 'jquery.min.js')) {
		$buffer = str_replace( "</head>", "\n\n$jquery\n\n</head>", $buffer );
	}

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
// @todo test if tidy is supported / config
//ob_start( 'ob_tidyhandler' );
?>