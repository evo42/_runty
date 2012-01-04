(function(window, undefined) {

	if (window.Aloha === undefined || window.Aloha === null) {
		var Aloha = window.Aloha = {};
	}
	
	/*
		This is a minimal Aloha Editor configuration
		
		In this Aloha Editor Nano CMS Demo we add a custom plugin.
		This plugin is located in our own specific plugin bundle.
	*/
	Aloha.settings = {
		bundles: {
			// Path for custom bundle relative from Aloha.settings.baseUrl usually path of aloha.js
			custom: '../../../js/aloha-plugins'
		},
    	plugins: "common/format, common/table, common/list, common/link, " +
    			"common/highlighteditables, common/block, common/undo, " +
    			"common/contenthandler, common/paste, common/commands, extra/flag-icons, " +
    			"common/abbr, extra/browser, extra/linkbrowser, custom/runty"

	};
})(window);