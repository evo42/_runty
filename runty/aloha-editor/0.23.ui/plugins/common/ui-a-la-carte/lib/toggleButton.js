define('ui/toggleButton', [
	'ui/original-toggleButton'
], function (
	ToggleButton
) {
	'use strict';
	return ToggleButton.extend({
		setState: function (state) {
			ToggleButton.prototype.setState.apply(this, arguments);
			if (state) {
				this.buttonElement.addClass('active');
			} else {
				this.buttonElement.removeClass('active');
			}
		}
	});
});
