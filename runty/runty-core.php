<?php
$runty = (object) array();
$runty->core_path = dirname( __FILE__ );

//require('../content/.runty/runty-config.php');

require_once $runty->core_path . '/runty-authentication.php';
//require_once $runty->core_path . '/runty-repository.php';
//require_once $runty->core_path . '/runty-store.php';


$request_method = false;

// route request
switch ( $request_method ) {

	case 'query':
		\runty\repository\query( );
		break;

	case 'store':
		break;
	
}

?>