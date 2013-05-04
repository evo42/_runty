define('ui/ui-plugin', [
	'aloha/jquery',
	'ui/surface',
	'ui/scopes',
	'PubSub'
], function (
	$,
	Surface,
	Scopes,
	PubSub
) {
	'use strict';

	var scopeByTab = {
		'format': ['Aloha.continuoustext'],
		'insert': ['Aloha.continuoustext'],
		'link': ['link'],
		'image': ['image'],
		'abbr': ['abbr'],
		'wai-lang': ['wai-lang'],
		'table': ['table.cell', 'table.column', 'table-row']
	};

	var nonPrimaryTabs = {
		'insert': true
	};

	PubSub.sub('aloha.ui.scope.change', function () {
		for (var tabId in scopeByTab) {
			if (scopeByTab.hasOwnProperty(tabId)) {
				var tabHandle = $('#menu').find('a[href="#' + tabId + '"], a[data-target="#' + tabId + '"]');
				var scopes = scopeByTab[tabId];
				var active = false;
				var primary = false;
				for (var i = 0; i < scopes.length; i++) {
					if (Scopes.isActiveScope(scopes[i])) {
						active = true;
						if (scopes[i] === Scopes.getPrimaryScope()) {
							primary = true;
						}
					}
				}
				if (active) {
					tabHandle.parent('li').removeClass('not-in-scope');
				} else {
					tabHandle.parent('li').addClass('not-in-scope');
				}
				if (primary && !nonPrimaryTabs[tabId]) {
					tabHandle.tab('show');
				}
			}
		}

	});

	Surface.trackRange($('#toolbar'));
	Scopes.setScope('Aloha.continuoustext');

	return {
		adoptInto: function (slot, component) {
		},
		showToolbar: function (event) {
		}
	};
});
