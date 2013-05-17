define([
   'jquery',
	'block/block',
	'block/blockmanager',
], function(jQuery, block, BlockManager) {
	var VideoBlock = block.AbstractBlock.extend({
		title: 'VideoBlock',
		getSchema: function() {
			return {
				'source': {
					type: 'string',
					label: 'Source'
				},
			}
		},
		init: function($element, postProcessFn) {
			this.attr('source', $element.find('iframe').attr('src'));
			postProcessFn();
		},
		update: function($element, postProcessFn) {
			$element.find('iframe').first().attr('src', this.attr('source'));
			postProcessFn();
		}
	});
	return {
		VideoBlock: VideoBlock,
	};
});