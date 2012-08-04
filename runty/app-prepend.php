<?php
/* runty-prepend.php is part of the Runty NoCMS project http://aloha-editor.org/runty
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

require_once dirname( __FILE__ ) . '/core.php';

function runty_loader( $buffer ) {
  // inject a script tag to load runty
	
	$aloha = '
	<link rel="stylesheet" href="../runty/theme/css/runty.css" type="text/css">
	
	<link rel="stylesheet" href="http://cdn.aloha-editor.org/latest/css/aloha.css" type="text/css">

	<!-- script src="../runty/deps/jquery-ui/js/jquery-ui-1.8.16.custom.min.js"></script>
	<link rel="stylesheet" href="../runty/deps/jquery-ui/theme/css/smoothness/jquery-ui-1.8.16.custom.css" type="text/css" -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>


	<script src="../runty/app/aloha-editor.js"></script>
	<script src="../.runty/aloha-editor.js"></script>
	
    <script src="http://cdn.aloha-editor.org/latest/lib/require.js" ></script>
	<!-- script src="http://cdn.aloha-editor.org/latest/lib/vendor/jquery-1.7.2.js"></script -->
    <script src="http://cdn.aloha-editor.org/latest/lib/aloha.js" ></script>

	
	<script type="text/javascript">
	//if (!window.Aloha || !Aloha) {
		//return false;
		//var Aloha = window.Aloha = {};

		Aloha.ready( function() {
			Aloha.jQuery(".runty-editable").aloha();
		});
	//}
	</script>
	
	<script src="../runty/app/plugin/toolbar.js"></script>

	<script src="../runty/app/load.js"></script>

	<script type="text/javascript">console.log("app loaded");</script>
	
	';

	// @todo check for https/http / jquery
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
  	//console.log("assertion", assertion);
    $.ajax({  
      type: "POST",  
      url: "/runty/runty/login.php",  
      data: { assertion: assertion },  
      success: function(res, status, xhr) {  
        //if (res === null) {}//loggedOut();  
         // else loggedIn(res);
      	console.log("login ok", res, status);
      	checkLogin(res);
       },  
      error: function(res, status, xhr) {  
        //alert("login failure" + res);
        console.log("login failure", res);
      }  
    });  
  } else {  
    //loggedOut();  
  }  
}

function checkLogin(res) {
	console.log("check login", res);

	var obj = jQuery.parseJSON(res);
	console.log( obj.status, obj.email );

	if (obj.status === "okay") {
		//$("#browserid").fadeOut();
		
		console.log(document.location,document.location.origin,document.location.pathname);
		
		document.location.href=document.location.origin + document.location.pathname;



	}
}


		</script>

		<script type="text/javascript">console.log("browserid loaded");</script>
	';

	$login = '
		<a href="#" id="browserid" title="Sign-in with BrowserID">  
  			<img src="http://browserid.org/i/sign_in_blue.png" alt="Sign in" />  
		</a>
	';
	
	
	//$_SESSION['user']->role = 'admin';
	//$_SESSION['user']->id = 'rene.kapusta@gmail.com';
	//$_SESSION['user']->role = false;
	//$_SESSION['user']->id = 'guest';
	
	if ( !empty($_SESSION['user']) ) {
		
		if ($_SESSION['user']->id == 'guest') {
			
		} else if ($_SESSION['user']->role == 'admin') {
			$buffer = str_replace( "</body>", "\n\n$aloha\n\n</body>", $buffer );
		}
		//$buffer = str_replace( "</body>", "\n\n$aloha\n\n</body>", $buffer );
		//$buffer = str_replace( "</body>", "\n\n$browserid\n\n</body>", $buffer );
		//$buffer = str_replace( "</head>", "</head>\n\n$login\n\n", $buffer );
		return ( $buffer );
		//return ( str_replace( "</head>", "\n\n$aloha\n\n</head>", $buffer ) );
	/*} else if ( isset($_REQUEST['login']) && empty($_SESSION['user']) ) {
		$buffer = str_replace( "</head>", "\n\n$browserid\n\n</head>", $buffer );
		$buffer = str_replace( "</head>", "</head>\n\n$login\n\n", $buffer );
		return ( $buffer );*/
	} else {
		$buffer = str_replace( "</body>", "\n\n$aloha\n\n</body>", $buffer );
		//$buffer = str_replace( "</body>", "\n\n$browserid\n\n</body>", $buffer );
		//$buffer = str_replace( "</head>", "</head>\n\n$login\n\n", $buffer );
		return ( $buffer );
		//return false;
	}
}

// call runty_loader callback function 
ob_start( 'runty_loader' );

// tidy contents in order to get valid html
//ob_start( 'ob_tidyhandler' );

?>