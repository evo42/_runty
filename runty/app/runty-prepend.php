<?php


function runty_loader( $buffer ) {
  // inject a script tag to load runty
  //return ( str_replace( "apples", "oranges", $buffer ) );
	$aloha = '
	<link rel="stylesheet" href="../runty/app/css/runty.css" type="text/css">
	
	<script src="../runty/app/js/aloha/lib/aloha.js"
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
	                            extra/linkbrowser"></script>
	
	<script type="text/javascript">
		Aloha.ready(function() {
			Aloha.require( ["aloha", "aloha/jquery" ], function( Aloha, jQuery ) {
				// here jQuery 1.6 from Aloha is used
				//console.log("Aloha jQuery: " + jQuery().jquery);

				//jQuery("#aloha-loading").hide();

				//jQuery("#edit-page").bind("click", function() {
					//alert("Edit the page content. To be done.");
					jQuery(".runty-editable").aloha();

					//jQuery("#edit-page").hide();
					//jQuery("#save-page").show();
				//});
			});
		});
	</script>
	';
  return ( str_replace( "</head>", "\n\n$aloha\n\n</head>", $buffer ) );
}

// call runty_loader callback function 
ob_start( 'runty_loader' );

// tidy contents in order to get valid html
ob_start( 'ob_tidyhandler' );

?>