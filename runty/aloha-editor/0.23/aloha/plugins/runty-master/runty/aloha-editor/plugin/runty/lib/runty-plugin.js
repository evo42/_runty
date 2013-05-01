define( [
	'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'../../runty/extra/runty-linklist' // custom linklist
], function (
	Aloha,
	jQuery,
	Plugin) {

	var GENTICS = window.GENTICS;

	/**
	 * register the plugin with unique name
	 */
	return Plugin.create('runty-plugin', {

		/**
		 * Initialize the plugin and set initialize flag on true
		 */
		init: function () {
			// do nothing
		},

		/**
		* toString method
		* @return string
		*/
		toString: function () {
			return 'runty-plugin';
		}
	} );
} );
