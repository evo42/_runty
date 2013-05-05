define('ui/component', ['aloha/jquery', 'util/class'], function ($, Class) {
	'use strict';
	return Class.extend({
		_constructor: function () {
			this.init();
		},
		show: function (show_opt) {
			this.enable(show_opt);
		},
		hide: function () {
			this.disable();
		},
		disable: function () {
			this.element.prop('disabled', true);
		},
		enable: function (enable_opt) {
			this.element.prop('disabled', false === enable_opt);
		},
		focus: function () {
			this.element.focus();
		},
		foreground: function () {
			var id = this.element.parents('.tab-pane').attr('id');
			if (id) {
				$('#menu').find('a[href="#' + id + '"], a[data-target="#' + id + '"]').tab('show');
			}
		}
	});
});
