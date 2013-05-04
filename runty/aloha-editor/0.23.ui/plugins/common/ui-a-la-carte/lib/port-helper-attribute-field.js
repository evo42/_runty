define('ui/port-helper-attribute-field', [
	'jquery',
	'ui/original-port-helper-attribute-field',
	'util/strings'
], function (
	$,
	AttributeField,
	Strings
) {
	'use strict';
	return function (props) {
		// editLink
		props.element = $('#aloha-component-' + Strings.camelCaseToDashes(props.name));;
		delete props.width;
		var attrField = AttributeField(props);
		attrField.show = function () {
			$(this.getInputElem()).prop('disabled', false);
		}
		attrField.hide = function () {
			$(this.getInputElem()).prop('disabled', true);
		};
		return attrField;
	};
});
