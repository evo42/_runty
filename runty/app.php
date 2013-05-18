<?php
/* prepend.php is part of the Runty. The NoCMS project http://runtyapp.org
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
require_once dirname( __FILE__ ) . '/app/core.php';

echo $html = runty_loader();

// runty loader
function runty_loader() {
	// inject html, javascript & css into the page to load Runty
	$buffer = '';

	// ToDo list:
	// @todo check if .runty/aloha-editor.js & /runty/aloha-editor/aloha-editor.js are available
	// @todo make theme config able
	// @todo include jquery just once (improve?)
	// @todo multilingual
	// @todo add guid as id attribute to all elements with class runty-editable and not id attr.

	// if check / update ids write buffer back to file
	$updateContentIds = true;
	// editing with aloha editor
	// 'http://cdn.aloha-editor.org/latest/' -- '/runty/aloha-editor/0.23.ui/'
	$aloha_url = '/runty/aloha-editor/0.23.ui/'; 
	
	$html = '';
	
	$aloha = '
	    document.write(\'<link rel="stylesheet" href="/runty/aloha-editor/0.23.ui/plugins/common/ui-a-la-carte/css/ui-a-la-carte.css" type="text/css"><link rel="stylesheet" href="/runty/theme/css/aloha-components.css" type="text/css"><link href="/runty/theme/flat-ui/css/bootstrap.css" rel="stylesheet"><link href="/runty/theme/flat-ui/css/flat-ui.css" rel="stylesheet"><link rel="stylesheet" href="/runty/theme/css/runty.css" type="text/css"><link rel="stylesheet" href="'.$aloha_url.'css/aloha.css" type="text/css">\');';
	
	$aloha .= '
		document.write(\'<script src="/runty/aloha-editor/aloha-editor.js"></script>\');
		document.write(\'<script src="/.runty/aloha-editor.js"></script>\');

		document.write(\'<script src="'.$aloha_url.'lib/aloha.js" ></script>\');

		';
		
	$aloha_cmd = 'jQuery("#runty-button-save").hide();jQuery("#runty-button-edit").show();';

    $aloha .= '
        var w = \'<script type="text/javascript">'.trim($aloha_cmd).'</script>\';
		document.write(w);
	';
	
	$aloha .= '
	    document.write(\'<script type="text/javascript">var $toolbar=$("#toolbar");$toolbar.hide();Aloha.ready(function(){var e=Aloha.jQuery;Aloha.bind("aloha-editable-activated",function(){e(this.activeEditable.obj).mouseover(function(e){$toolbar.css({position:"absolute",top:e.pageY,left:e.pageX})});$toolbar.show()});Aloha.bind("aloha-editable-deactivated",function(){$toolbar.hide()})})</script>\');
	';

    $aloha .= 'document.write(\'<script type="text/javascript">Aloha.ready( function () {$(".runty-editable").aloha()})</script>\');';
	
	
	// require
	// http://requirejs.org/docs/release/2.0.5/minified/require.js
	$requirejs = '
		document.write(\'<script src="'.$aloha_url.'lib/require.js"></script>\');
	';

	// jquery
	$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
	//$jquery_url = 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
	
	$jquery = '
		document.write(\'<script src="'.$jquery_url.'"></script>\');
	';

    // aloha-editor jquery 1.8+ fix
	/*$jquery .= '
	    document.write(\'<script src="/runty/vendor/jquery-migrate.js"></script>\');
	';*/
    
    $bootstrap = '
        document.write(\'<script src="/runty/theme/flat-ui/js/bootstrap.min.js"></script>\');
    '; // @todo move to runty/vendor

	// runty app
	$runty_app = '
		document.write(\'<script src="/runty/app.js"></script>\');
	';

	// runty toolbar
	$toolbar = '';
	$user_email = 'edit@runtyapp.org';    
	if (isset($_SESSION['user'])) {
	    if (!empty($_SESSION['user']->email)) {
	        $user_email = strtolower(trim($_SESSION['user']->email));
	    }
	}
    $user_hash = md5($user_email);

    //if (!empty($_SESSION['user'])) {
        $toolbar .= 'document.write(\'<script>var runtyUserEmail = "'.$user_email.'";var runtyUserHash ="'.$user_hash.'"</script>\');';
    //}
    
    if (!empty($_SESSION['user'])) {
	$toolbar .= '
		document.write(\'<script src="/runty/vendor/utf8_encode.js"></script>\');
	    document.write(\'<script src="/runty/vendor/md5.js"></script>\');
	';
	
	$toolbar .= '
		document.write(\'<script src="/runty/plugin/toolbar.js"></script>\');
	';
	
	$toolbar .= 'document.write(\'<script type="text/javascript">function setProfileData( profile ) { window.console.log(profile); $("#runty-user-gravatar").attr("title", profile.entry[0].displayName); } </script> <script src="http://en.gravatar.com/'.$user_hash.'.json?callback=setProfileData" type="text/javascript"></script>\');';
	
	}
	
    $toolbar.= 'document.write(\'<div id="toolbar" style="display:none;"><div id="menu"><ul class="nav nav-tabs"><li class="active"><a href="#format" data-toggle="tab">Format</a></li><li class="not-in-scope"><a href="#link" data-toggle="tab">Link</a></li></ul></div><div id="toolbar-components" class="tab-content"><div class="tab-pane active" id="format"><div class="btn-group"><button class="btn" id="aloha-component-bold" title="Format bold"><i class="icon-white icon-bold"></i></button><button class="btn" id="aloha-component-italic" title="Format italic"><i class="icon-white icon-italic"></i></button><button class="btn" id="aloha-component-comment" title="Format as quote"><span class="icon-white icon-comment"></span></button><button class="btn" id="aloha-component-insert-link"><span class="icon-white icon-globe"></span></button></div><div class="btn-group"><button class="btn" id="aloha-component-unordered-list" title="Insert unordered list"><span class="icon-white icon-list"></span></button><button class="btn" id="aloha-component-indent-list" title="Indent left" disabled><span class="icon-white icon-indent-left"></span></button><button class="btn" id="aloha-component-outdent-list" title="Indent right" disabled><span class="icon-white icon-indent-right"></span></button></div><div id="aloha-component-format-block" class="btn-group dropdown"><a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><span class="dropdown-text">Paragraph</span><span class="caret"></span></a><ul class="dropdown-menu"><li><a class="aloha-component-h" id="aloha-component-h1" href="#">Heading 1</a></li><li><a class="aloha-component-h" id="aloha-component-h2" href="#">Heading 2</a></li><li><a class="aloha-component-h" id="aloha-component-h3" href="#">Heading 3</a></li><li><a class="aloha-component-h" id="aloha-component-h4" href="#">Heading 4</a></li><li><a class="aloha-component-h" id="aloha-component-h5" href="#">Heading 5</a></li><li><a class="aloha-component-h" id="aloha-component-h6" href="#">Heading 6</a></li><li><a id="aloha-component-p" href="#">Paragraph</a></li><li><a id="aloha-component-pre" href="#">Preformatted</a></li><li><a id="aloha-component-blockquote" href="#">Blockquote</a></li><li><a id="aloha-component-remove-format" href="#">Remove format</a></li></ul></div></div><div class="tab-pane" id="link"><div class="btn-group"><button class="btn" id="aloha-component-remove-link" title="Remove link"><span class="icon-white icon-trash"></span></button><input type="text" id="aloha-component-edit-link"></div></div></div></div>\')';
    
    

	// @todo check for https/http
	$browserid = '
		document.write(\'<script src="http://browserid.org/include.js"type="text/javascript"></script><script type="text/javascript">$(function(){$("#browserid").click(function(){navigator.id.get(gotAssertion);return false})});function gotAssertion(assertion){if(assertion!==null){$.ajax({type:"POST",url:"/runty/app/authentication.php",data:{assertion:assertion},success:function(res,status,xhr){checkLogin(res)},error:function(res,status,xhr){if(window.console){window.console.log("login failure"+res)}}})}else{}}function checkLogin(res){var obj=jQuery.parseJSON(res);if(obj.status==="okay"){document.location.href=document.location.origin+document.location.pathname}}</script>\');
	';

	$login = '
		document.write(\'<div id="runty-authenticate"> <span><a href="#" id="browserid" title="Sign-in with BrowserID"> <img src="http://browserid.org/i/sign_in_blue.png" alt="Sign in" /> </a></span> </div>\');
	';

	if (empty($_REQUEST['sign'])) {
		$_REQUEST['sign'] = false;
	}
	if (empty($_REQUEST['type'])) {
		$_REQUEST['type'] = false;
	}
	if (empty($_REQUEST['action'])) {
		$_REQUEST['action'] = false;
	}

    if ($_REQUEST['type'] == 'aloha') {
        $type_buffer = $buffer;
        $type_buffer .= "\n\n$requirejs\n\n";
        $type_buffer .= "\n\n$jquery\n\n";
        $type_buffer .= "\n\n$bootstrap\n\n";
        
        $type_buffer .= "\n\n$toolbar\n\n";
        $type_buffer .= "\n\n$aloha\n\n";
        $type_buffer .= "\n\n$runty_app\n\n";
        
        return ( $type_buffer );
        exit();
    }

    // add require and jquery to the output
    //$buffer .= "\n\n$toolbar_aloha\n\n";
    $buffer .= "\n\n$requirejs\n\n";
    $buffer .= "\n\n$jquery\n\n";
    $buffer .= "\n\n$bootstrap\n\n";
	
	if ( !empty($_SESSION['user']) ) {

		if (empty($_SESSION['user']->email)) {
			$buffer .= "\n\n$browserid\n\n";
			//$buffer .= "\n\n$login\n\n";
			return ( $buffer );
		}
		
		$buffer .= "\n\n$toolbar\n\n";
		
		if (isset($_SESSION['user']->role)) {
		if ($_SESSION['user']->role == 'admin' || $_SESSION['user']->role == 'editor') {
			$buffer .= "\n\n$aloha\n\n";
		}
		}

        $buffer .= "\n\n$runty_app\n\n";
        
		return ( $buffer );
	} else {
		$buffer .= "\n\n$browserid\n\n";
		//$buffer .= "\n\n$login\n\n";
		$buffer .= "\n\n$runty_app\n\n";
        
		return ( $buffer );
	}
}
