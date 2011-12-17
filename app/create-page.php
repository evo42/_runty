<?php

error_log("\n\n".'###### create page', 3, "cms.log");

// XSS handling required
$template = $_REQUEST['template'];
$filename = $_REQUEST['filename'];

if ( !empty($template) && !empty($filename) ) {

	$data = file_get_contents('../templates/'.$template);
	// check for utf-8
	// check if file already exists
	if (file_put_contents('../'.$filename, $data)) {
		echo './'.$filename;
		error_log("\n".'page '.$filename.' created', 3, "cms.log");
	}

}

?>