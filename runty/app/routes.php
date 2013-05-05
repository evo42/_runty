<?php
/* routes.php is part of the Runty. NoCMS project http://runtyapp.org
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
    $jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
	
	$jquery = '
		<script src="'.$jquery_url.'"></script>
	';
	
	$persona_css = '<link rel="stylesheet" href="/runty/theme/css/persona-button.css" type="text/css" />';

    $browserid = '
		<script src="http://browserid.org/include.js"type="text/javascript"></script>
		<script type="text/javascript">
		$(function () {
    	    $("#browserid").click(function () {
    	        navigator.id.get(gotAssertion);
    	        return false
    	    })
    	});
    	function gotAssertion(assertion) {
    	    if (assertion !== null) {
    	        $.ajax({
    	            type: "POST",
    	            url: "/runty/app/authentication.php",
    	            data: {
    	                assertion: assertion
    	            },
    	            success: function (res, status, xhr) {
    	                checkLogin(res)
    	            },
    	            error: function (res, status, xhr) {
    	                if (window.console) {
    	                    window.console.log("login failure" + res)
    	                }
    	            }
    	        })
    	    } else {}
    	}
    	function checkLogin(res) {
    	    var obj = jQuery.parseJSON(res);
    	    if (obj.status === "okay") {
    	        document.location.href = document.location.origin + document.location.pathname
    	    }

    	};
		</script>
	';


    $header = '<!doctype html>
    <head>
    	<title>Runty. NoCMS</title>

    	<meta charset="UTF-8">
    	<meta name="description" content="Runty. NoCMS">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	<link rel="shortcut icon" href="./favicon.ico">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
        <!--[if lt IE 9]>
          <script src="/runty/theme/flat-ui/js/html5shiv.js"></script>
        <![endif]-->

        <link href="/runty/theme/flat-ui/css/bootstrap.css" rel="stylesheet">
        <link href="/runty/theme/flat-ui/css/flat-ui.css" rel="stylesheet">
    ';
    $header .= $persona_css;
    $header .= $jquery;
    $header .= $browserid;
    $header .= '</head>
    <body>
    ';

    $footer = '<script src="/runty/theme/flat-ui/js/bootstrap.min.js"></script>

        <!-- Load JS here for greater good =============================-->
        <script src="/runty/theme/flat-ui/js/jquery-1.8.2.min.js"></script>
        <script src="/runty/theme/flat-ui/js/jquery-ui-1.10.0.custom.min.js"></script>
        <script src="/runty/theme/flat-ui/js/jquery.dropkick-1.0.0.js"></script>
        <script src="/runty/theme/flat-ui/js/custom_checkbox_and_radio.js"></script>
        <script src="/runty/theme/flat-ui/js/custom_radio.js"></script>
        <script src="/runty/theme/flat-ui/js/jquery.tagsinput.js"></script>
        <script src="/runty/theme/flat-ui/js/bootstrap-tooltip.js"></script>
        <script src="/runty/theme/flat-ui/js/jquery.placeholder.js"></script>
        <script src="/runty/theme/flat-ui/js/application.js"></script>

        <!--[if lt IE 8]>
          <script src="/runty/theme/flat-ui/js/icon-font-ie7.js"></script>
          <script src="/runty/theme/flat-ui/js/icon-font-ie7-24.js"></script>
        <![endif]-->
    </body>
    </html>';


    echo $header;
    
    $body = '    <div class="container">

        <div class="login">
          <div class="login-screen">
            <div class="login-icon">
              <img src="/runty/theme/flat-ui/images/illustrations/infinity.png" alt="Welcome to Runty. NoCMS" />
              <h4>Welcome to <small>Runty. NoCMS</small></h4>
            </div>

            <div class="login-form">
            <div class="control-group">
            ';
            
            $body .= '
            </div>
              <!-- div class="control-group">
                <input type="text" class="login-field" value="" placeholder="Enter your name" id="login-name" />
                <label class="login-field-icon fui-man-16" for="login-name"></label>
              </div>

              <div class="control-group">
                <input type="password" class="login-field" value="" placeholder="Password" id="login-pass" />
                <label class="login-field-icon fui-lock-16" for="login-pass"></label>
              </div -->
';

if ( empty($_SESSION['user']->email) ) {
    $body .= '<a class="btn btn-primary btn-large btn-block" id="browserid" href="#sign-in" title="Sign-in with BrowserID / Mozilla Persona">Sign in</a>
    <a class="login-link" href="https://persona.org">Lost your password?</a>
      <br /><br />
      <a class="login-link" href="https://login.persona.org/about">Mozilla Persona / BrowserID login</a>
      
      ';
} else {
    $body .= '<a class="btn btn-primary btn-large btn-block" href="/">Manage</a> 
    <br /><br />
    <a class="btn btn-primary btn-large btn-block" href="/runty/?sign=off">Sign off</a>';
}

$body .= '
              

            </div>
          </div>
      </div>
    </div>
    ';
    
    echo $body;
    
    echo $footer;
});
