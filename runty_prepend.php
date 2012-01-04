<?php

function runty_loader( $buffer ) {
  // inject a script tag to load runty
  return ( str_replace( "apples", "oranges", $buffer ) );
}

// call runty_loader callback function 
ob_start( 'runty_loader' );

// tidy contents in order to get valid html
ob_start( 'ob_tidyhandler' );

?>