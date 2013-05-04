define([
	'aloha/jquery',
	'aloha/core',
	'jquery',
	'ui/ui',
	'util/strings'
], function (
	$,
	Aloha,
	jQuery,
	Ui,
	Strings
) {
	'use strict';

	function MultiSplitButton(props) {
		var multiSplit = {
			pushItem: function (item) {
				// blockquote
				hookItem(item);
			},
			showItem: function (name) {
			},
			hideItem: function (name) {
			},
			setActiveItem: function (name) {
				if (name) {
					var dropdown = $('#aloha-component-format-block');
					var button = dropdown.find('.dropdown-toggle').eq(0);
					var component = $('#aloha-component-' + Strings.camelCaseToDashes(name));
					dropdown.find('.dropdown-text').eq(0).html($(component).html());
				}
			}
		};

		function hookItem(item) {
			$('#aloha-component-' + Strings.camelCaseToDashes(item.name)).click(function () {
				item.click.apply(multiSplit, arguments);
			});
		}

		//p h1...h6 pre removeFormat
		for (var i = 0; i < props.items.length; i++) {
			hookItem(props.items[i]);
		}

		return multiSplit;
	}

	return MultiSplitButton;
});
