define('ui/button', [
	'jquery',
	'ui/component',
	'util/strings'
], function (
	$,
	Component,
	Strings
) {
	'use strict';
	return Component.extend({
		init: function () {
			this.createButtonElement();
			this.element.click($.proxy(this._onClick, this));
		},
		createButtonElement: function () {
			var button = $('#aloha-component-' + Strings.camelCaseToDashes(this.name));
			if (!button.length) {
				button = $('<button>');
			}
			this.element = this.buttonElement = button;
		},
		_onClick: function () {
			this.click();
		},
		click: function () { }
	});
});
