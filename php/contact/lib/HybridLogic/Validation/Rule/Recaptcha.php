<?php

namespace HybridLogic\Validation\Rule;

/**
 * Number must be greater than or equal to value
 *
 * @package Validation
 * @author Mairel Theafila <maimairel@yahoo.com>
 **/
class Recaptcha implements \HybridLogic\Validation\Rule, \HybridLogic\Validation\ClientSide\jQueryValidationRule {


	/**
	 * @var string privatekey value
	 **/
	protected $privatekey = 0;


	/**
	 * Constructor
	 *
	 * @param string privatekey value
	 * @return void
	 **/
	public function __construct($privatekey) {
		$this->privatekey = $privatekey;
	} // end func: __construct



	/**
	 * Validate this Rule
	 *
	 * @param string Field name
	 * @param string Field value
	 * @param Validator Validator object
	 * @return bool True if rule passes
	 **/
	public function validate($field, $value, $validator) {
		$this->result = recaptcha_check_answer ($this->privatekey, $_SERVER["REMOTE_ADDR"], $_POST["recaptcha_challenge_field"], $_POST["recaptcha_response_field"]);
		return $this->result->is_valid;
	} // end func: validate



	/**
	 * Return error message for this Rule
	 *
	 * @param string Field name
	 * @param string Field value
	 * @param Validator Validator object
	 * @return string Error message
	 **/
	public function get_error_message($field, $value, $validator) {
		return $validator->get_label($field) . " is invalid, please try again.";
	} // end func: get_error_message


	/**
	 * jQuery Validation rule name
	 *
	 * @return string Rule name
	 **/
	public function jquery__get_rule_name() {
		return 'recaptcha';
	} // end func: jquery__get_rule_name



	/**
	 * jQuery Validation rule definition
	 *
	 * @return array Rule
	 **/
	public function jquery__get_rule_definition() {
		return array(
			'recaptcha' => 'recaptcha'
		);
	} // end func: jquery__get_rule_definition

} // end class: Recaptcha