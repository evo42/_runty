<?php

//require_once('aloha-micro-cms.php');
function callback($buffer)
{
  // replace id=aloha-menu with menu
  return (str_replace("apples", "oranges", $buffer));

}
ob_start("callback");
ob_implicit_flush(true);

?>

Hi apples you go to <?=$_SERVER['REQUEST_URI']?>!