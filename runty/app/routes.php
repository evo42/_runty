<?php
/* routes.php is part of the Runty. The NoCMS project http://runtyapp.org
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
    	    //console.log(res);
    	    var obj = jQuery.parseJSON(res);
    	    if (obj && obj.status === "okay") {
    	        document.location.href = document.location.origin + document.location.pathname
    	    }

    	};
		</script>
	';


    $header = '<!doctype html>
    <head>
    	<title>Runty. The NoCMS</title>

    	<meta charset="UTF-8">
    	<meta name="description" content="Runty. The NoCMS">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	<link rel="shortcut icon" href="./favicon.ico">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
        <!--[if lt IE 9]>
          <script src="/runty/theme/flat-ui/js/html5shiv.js"></script>
        <![endif]-->

        <link href="/runty/theme/flat-ui/css/bootstrap.css" rel="stylesheet">
        <link href="/runty/theme/flat-ui/css/flat-ui.css" rel="stylesheet">
    	<link rel="stylesheet" href="/runty/theme/css/runty.css" type="text/css">

    ';
    $header .= $persona_css;
    $header .= $jquery;
    $header .= $browserid;
    $header .= '</head>
    <body>
    ';

    $footer = '<script src="/runty/theme/flat-ui/js/bootstrap.min.js"></script>

        <!-- Load JS here for greater good =============================
        <script src="/runty/theme/flat-ui/js/jquery-1.8.2.min.js"></script>
        -->
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
    
    $no_mh = '';
    if (empty($_SESSION['user']->email)) {
        $no_mh = 'no-min-height';
    }
    
    $body = '    <div class="container">

        <div class="login">
          <div class="login-screen">
            <div class="login-icon">
              <a href="/"><img src="/runty/theme/flat-ui/images/illustrations/infinity.png" alt="Runty. The NoCMS" /></a>
              <h4 style="text-align: center">Runty. <small>The NoCMS</small></h4>
            </div>

            <div class="login-form '.$no_mh.'">
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

              <div id="page">
';

$page = '';
$js = '';
if ( empty($_SESSION['user']->email) && !empty($_SESSION['runty']->users)) {
    // sign-in if there's no authenticated user
    $body .= '<a class="btn btn-primary btn-large btn-block" id="browserid" href="#sign-in" title="Sign-in with BrowserID / Mozilla Persona">Sign in</a>
    <a class="login-link" href="/">Home page</a>
      <br /><br />
      <a class="login-link" href="https://login.persona.org/about">Mozilla Persona / BrowserID</a>
      
      ';
} else if (!empty($_SESSION['user']->email)) {
    // hello! we have a authenticated user
    $body .= $page = '
        <a class="btn btn-primary btn-large btn-block" href="/">Edit pages</a> 
        <br />
        <a id="add_page" class="btn btn-primary btn-large btn-block" href="#add-page">Add page</a> 
        <br />
        <a id="manage_user" class="btn btn-primary btn-large btn-block" href="#user">Manage user</a> 
        <br />
        <a class="btn btn-primary btn-large btn-block" href="/runty/?sign=off">Sign off</a>
    ';


    //$page .= $js;

    // @todo fix this soon...
    //$page = str_replace('##content##', $page, $page.$js);
    $page_js = trim(addslashes(str_replace(array("\r", "\n"), '', $page)));
    $js = "<script>
        $('#manage_user').click(function(){
            $('#page').load('../runty/theme/manage-user.php?content=".urlencode($page_js)."');
        });    $('#add_page').click(function(){
            $('#page').load('../runty/theme/manage-page.php?content=".urlencode($page_js)."', function(){
            });
        });
        
    </script>";
    
    //$page .= $js;
    
} else if (empty($_SESSION['runty']->users)) {
    // install the system. there's no user list available.
    $body .= '
        <h1>Runty. The NoCMS</h1>
        <h2>Installation guide</h2>
        <p>To install this software follow the next steps.</p>
        <ul>
        <li>Sign in with your <a href="https://login.persona.org">Mozilla Persona</a> identity.</li>
        </ul>
    
    <a class="btn btn-primary btn-large btn-block" id="browserid" href="#sign-in" title="Sign-in with Mozilla Persona / BrowserID">Sign in to install</a>
    <a class="login-link" href="https://login.persona.org/about">Authenticate with Mozilla Persona / BrowserID</a>';
    
} else {
    // some problem...
    $body .= '
    <h3>tzzzz...</h3>
    <a class="btn btn-primary btn-large btn-block" href="#reload" title="Reload. Now!">Reload!</a>
    <br /><br />
    ';
}

$body .= '
              </div>

            </div>
          </div>
      </div>
    </div>
    ';
 
    $body .= $js;

   
    echo $body;
    
    echo $footer;
});
