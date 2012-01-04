<?

require('./runty-config.php');

require('./runty-repository.php');
require('./runty-store.php');

// route request
switch ( $request_method ) {

	case 'query':
		\runty\repository\query( );
		break;

	case 'store':
		break;
	
}

?>