<?php
session_start();


	// user object
	if (!isset($_SESSION['user']) || empty($_SESSION['user']->id)) {
		$_SESSION['user'] = false;
		$_SESSION['user']->id = 'guest';
	}


if ( isset($_REQUEST['login']) ) {

	$http_protocol = 'http://';
	if ($_SERVER['SERVER_PORT'] == 80) {
		$http_protocol = 'http://';
	} else if ($_SERVER['SERVER_PORT'] == 443) {
		$http_protocol = 'https://';
	}

	// use other stuff than curl for the "cheap hosting environments"
	$data = exec('curl -d "assertion='.$_REQUEST['assertion'].'&audience='.$http_protocol.''.$_SERVER['HTTP_HOST'].'" "https://browserid.org/verify"');

	// {"status":"okay","email":"rene.kapusta@gmail.com","audience":"http://aloha","expires":1334279729067,"issuer":"browserid.org"}
	if ( !empty($data) ) {
		$signin_user = json_decode($data);

		if ($signin_user->status == 'okay') {
		$user_file = '.user';
	$user_data = file_get_contents($user_file);

	//print_r(jsonld_expand($user));
	$users = json_decode($user_data);

	foreach ($users as $id => $user) {
		$user = (array) $user;

		if ( $signin_user->email == $user['@id'] ) {
			$_SESSION['user'] = $signin_user;

			foreach($user as $key => $value) {
				//$key = str_replace('@', '___', $key);
				$key = str_replace('@', '', $key);
				$_SESSION['user']->$key = $value;
			}

			echo $data;
			die();
			//return true;
		}

	}

	echo 'Not Authenticated.';
	unset( $_SESSION['user'] );
	die();


		}
	}



} else if ( isset($_REQUEST['logout']) ) {
	unset( $_SESSION['user'] );
}
