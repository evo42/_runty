<?php

	spl_autoload_register(function($class_name){
		$file_name = str_replace('\\', '/', $class_name);
		$file_name = str_replace('_', '/', $file_name);
		$file = dirname(__FILE__) . "/lib/$file_name.php";
		if(is_file($file)) include $file;
	});

	use HybridLogic\Validation\Validator;
	use HybridLogic\Validation\Rule;

	require_once( 'lib/recaptcha/recaptchalib.php' );


	$CONFIG = array(
		/* Mail Options */
		'mail_send_to'		=>	'hello@runty.cc', 
		'mail_contents'		=>	'mail-content.php', 
		'mail_failed_msg'	=>	'An unknown error has occured', 

		/* Notification Messages */
		'form_errors_msg'	=>	'<h4>The following errors were encountered</h4><ul><li>%s</li></ul>', 
		'form_invalid_msg'	=>	'The form is invalid', 
		'form_success_msg'	=>	'<h4>Thank you</h4>Your message has been sent, we\'ll get back to you shortly :)', 

		/* Recaptcha Private Key */
		'recaptcha_private_key' => '6Leh0OASAAAAAD3tlDrVb8IB6oeta-F_VNtoG8nv'
	);
	
	function createFormMessage( $formdata )
	{
		global $CONFIG;
		
		ob_start();
		
		extract($formdata);
		include $CONFIG['mail_contents'];
		
		return ob_get_clean();
	}

	function cleanInput($input) {
		$search = array(
			'@<script[^>]*?>.*?</script>@si',   // Strip out javascript
			'@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
			'@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
			'@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments
		);

		$output = preg_replace($search, '', $input);
		return $output;
	}

	function sanitize($input) {
		if (is_array($input)) {
			foreach($input as $var=>$val) {
				$output[$var] = sanitize($val);
			}
		}
		else {
			if (get_magic_quotes_gpc()) {
				$input = stripslashes($input);
			}
			$input  = cleanInput($input);
			$output = $input;
		}
		return $output;
	}

	$formdata = sanitize( $_POST[ 'ContactForm' ] );
	$response = array();
	$validator = new Validator();
	$validator
	    ->set_label('name', 'Name')
	    ->set_label('email', 'Email')
	    ->set_label('url', 'URL')
	    ->set_label('recaptcha', 'Captcha')
	    ->set_label('subject', 'Subject')
	    ->set_label('message', 'Message')
	    ->add_filter('name', 'trim')
	    ->add_filter('email', 'trim')
	    ->add_filter('email', 'strtolower')
	    ->add_filter('subject', 'trim')
	    ->add_rule('name', new Rule\NotEmpty())
	    ->add_rule('url', new Rule\URL())
	    ->add_rule('email', new Rule\NotEmpty())
	    ->add_rule('email', new Rule\Email())
	    ->add_rule('subject', new Rule\NotEmpty())
	    ->add_rule('message', new Rule\NotEmpty())
	    ->add_rule('recaptcha', new Rule\Recaptcha( $CONFIG['recaptcha_private_key'] ));
	
	if( $validator->is_valid( $formdata ) )
	{
		require_once( 'lib/swiftmail/swift_required.php' );
		
		$transport = Swift_MailTransport::newInstance();
		$mailer = Swift_Mailer::newInstance($transport);
		
		$body = createFormMessage($formdata);
		
		$message = Swift_Message::newInstance();
		$message
			->setSubject($formdata['subject'])
			->setFrom($formdata['email'])
			->setTo($CONFIG['mail_send_to'])
			->setBody($body, 'text/html');
			
		if( !$mailer->send($message) ) {
			$response['success'] = false;
			$response['message'] = $CONFIG['mail_failed_msg'];
		} else {
			$response['success'] = true;
			$response['message'] = $CONFIG['form_success_msg'];
		}
	} else {
		$response = array( 'success'=>false, 'message'=>sprintf($CONFIG['form_errors_msg'], implode('</li><li>', $validator->get_errors() ) ) );
	}
	
	echo json_encode($response);
?>