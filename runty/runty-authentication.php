<?php

// simple sample auth
session_start();

if ( empty($_SESSION['user']) ) {
	$_SESSION['user'] = false;
}

if ( isset($_REQUEST['login']) ) {
	$_SESSION['user'] = 'dev.user';
} elseif ( isset($_REQUEST['logout']) ) {
	unset( $_SESSION['user'] );
}

//print_r($_SESSION);
