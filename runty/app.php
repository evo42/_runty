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
	if ($updateContentIds) {
		//$update = updateContentIds($buffer);
			// @todo use config / check for tidy in env. / use custom html5-tidy
			//$content = file_get_contents($_SERVER['HTTP_REFERER']);
			//$content = '';
			$tidy_config = array(	'indent' => true,
									'output-xhtml' => true,
									'wrap' => 200);
			//$tidy = new tidy();
			//$content_tidy = $tidy->repairString($content, $tidy_config, 'utf8');
			//$clean_referer = str_replace('http://runty/','../',$_SERVER['HTTP_REFERER']);
            //file_put_contents($clean_referer, $content_tidy);
	}

	// editing with aloha editor
	// 'http://cdn.aloha-editor.org/latest/' -- '/runty/aloha-editor/0.23/'
	$aloha_url = '/runty/aloha-editor/0.23/'; 
	
	$html = '';
	
	$aloha = '
	    document.write(\'<link rel="stylesheet" href="/runty/theme/css/runty.css" type="text/css"><link rel="stylesheet" href="'.$aloha_url.'css/aloha.css" type="text/css">\');';
	
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
	//$jquery_url = $aloha_url.'lib/vendor/jquery-1.7.2.js';
	
	$jquery = '
		document.write(\'<script src="'.$jquery_url.'"></script>\');
	';

    // aloha-editor jquery 1.8+ fix
	/*$jquery .= '
	    document.write(\'<script src="/runty/vendor/jquery-migrate.js"></script>\');
	';*/
    

	// runty app
	$runty_app = '
		document.write(\'<script src="/runty/app.js"></script>\');
	';

	// runty toolbar
	$toolbar = '
		document.write(\'<script src="/runty/plugin/toolbar.js"></script>\');
	';

	// @todo check for https/http
	$browserid = '
		document.write(\'<script src="http://browserid.org/include.js"type="text/javascript"></script><script type="text/javascript">$(function(){$("#browserid").click(function(){navigator.id.get(gotAssertion);return false})});function gotAssertion(assertion){if(assertion!==null){$.ajax({type:"POST",url:"./runty/authentication.php",data:{assertion:assertion},success:function(res,status,xhr){checkLogin(res)},error:function(res,status,xhr){if(window.console){window.console.log("login failure"+res)}}})}else{}}function checkLogin(res){var obj=jQuery.parseJSON(res);if(obj.status==="okay"){document.location.href=document.location.origin+document.location.pathname}}</script>\');
	';

	$login = '
		document.write(\'<div id="runty-authenticate"> <span><a href="#" id="browserid" title="Sign-in with BrowserID"> <img src="http://browserid.org/i/sign_in_blue.png" alt="Sign in" /> </a></span> </div>\');
	';

	if (empty($_REQUEST['sign'])) {
		$_REQUEST['sign'] = false;
	}
	if (empty($_REQUEST['action'])) {
		$_REQUEST['action'] = false;
	}

    // add require and jquery to the output
    $buffer .= "\n\n$requirejs\n\n";
    $buffer .= "\n\n$jquery\n\n";
    $buffer .= "\n\n$runty_app\n\n";

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
			$buffer .= "\n\n$browserid\n\n";
			$buffer .= "\n\n$login\n\n";
			return ( $buffer );
		} else {
			$buffer .= "\n\n$toolbar\n\n";
		}

		if ($_SESSION['user']->role == 'admin' || $_SESSION['user']->role == 'editor') {
			$buffer .= "\n\n$aloha\n\n";
		}

		return ( $buffer );
	} else {
		$buffer .= "\n\n$browserid\n\n";
		$buffer .= "\n\n$login\n\n";
		return ( $buffer );
	}
}

/*
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
	$return = new stdClass();
	$return->html = $html;
	$return->updates = $updates;
	return $return;
}
*/
