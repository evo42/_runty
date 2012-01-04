<?php
require_once dirname( __FILE__ ) . '/runty-core.php';

function runty_loader( $buffer ) {
  // inject a script tag to load runty
	
	$aloha = '
	<link rel="stylesheet" href="../runty/css/runty.css" type="text/css">
	<script src="../runty/js/runty-aloha.js"></script>
	
	<!-- move plugins to settings, once in dev AE branch -->
    <script src="../runty/deps/aloha-editor/lib/aloha.js"
	        data-aloha-plugins="common/format,
	                            common/table,
	                            common/list,
	                            common/link,
	                            common/highlighteditables,
	                            common/block,
	                            common/undo,
	                            common/contenthandler,
	                            common/paste,
	                            common/commands,
	                            extra/flag-icons,
	                            common/abbr,
	                            extra/browser,
	                            extra/linkbrowser,
								custom/runty"></script>

	<script type="text/javascript">
		Aloha.ready( function() {
			Aloha.jQuery(".runty-editable").aloha();
		});
	</script>
	';
	
	if ( !empty($_SESSION['user']) ) {
		return ( str_replace( "</head>", "\n\n$aloha\n\n</head>", $buffer ) );
	} else {
		return false;
	}
}

// call runty_loader callback function 
ob_start( 'runty_loader' );

// tidy contents in order to get valid html
ob_start( 'ob_tidyhandler' );

?>