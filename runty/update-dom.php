<?php
require_once './vendor/JSLikeHTMLElement.php';

// @todo
if (isset($_REQUEST['draft'])) {
	//die('draft');
	$draft = true;
} else {
	//die('else');
	$draft = false;
}

// @todo is draft mode! do not write to file ...
$draft = true;

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

//error_log("\n\n".'###### save as file '.$pageId, 3, "cms.log");


$filePath = preg_replace('%^(/*)[^/]+%', '$2..', $pageId);
$draftFilePath = '../.runty/draft/'.$filePath;
//error_log("\n\n".'###### save as file '.$filePath, 3, "cms.log");
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
	//error_log("\n innerhtml: ".print_r($elem->innerHTML, true), 3, "cms.log");

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

if ( !empty($error) ) {
	//error_log("\nerror: ".print_r($error, true), 3, "cms.log");
	print_r($error);
} else {
	//error_log("\OK. Content saved. ".$msg, 3, "cms.log");
	echo $msg;
}

?>