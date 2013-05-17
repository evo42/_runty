define([
   'jquery',
	'block/block',
	'block/blockmanager',
], function(jQuery, block, BlockManager) {
	var ThumbnailBlock = block.AbstractBlock.extend({
		title: 'ThumbnailBlock',
		getSchema: function() {
			return {
				'image': {
					type: 'string',
					label: 'Image URI'
				},
				'caption': {
					type: 'string',
					label: 'Caption'
				},
				'position': {
					type: 'select',
					label: 'Position',
					values: [{
						key: '',
						label: 'No Float'
					}, {
						key: 'left',
						label: 'Float left'
					}, {
						key: 'right',
						label: 'Float right'
					}]
				}
			}
		},
		init: function($element, postProcessFn) {
			this.attr('image', $element.find('img').attr('src'));
			this.attr('caption', $element.find('.caption').text());
			postProcessFn();
		},
		update: function($element, postProcessFn) {
			if (this.attr('position') === 'right') {
				$element.removeClass('pull-left');
				$element.addClass('pull-right');
			} else if (this.attr('position') === 'left') {
				$element.removeClass('pull-right');
				$element.addClass('pull-left');
			} else {
				$element.removeClass('pull-left');
				$element.removeClass('pull-right');
			}

			$element.find('img').first().attr('src', this.attr('image'));
			$element.find('.caption').first().text(this.attr('caption'));
			postProcessFn();
		}
	});
	var SpoilerBlock = block.AbstractBlock.extend({
		title: 'SpoilerBlock',
		getSchema: function() {
			return {
				'title': {
					type: 'string',
					label: 'Spoiler title'
				},
			}
		},
		init: function($element, postProcessFn) {
			this.attr('title', $element.find('.accordion-toggle').text());
			postProcessFn();
		},
		update: function($element, postProcessFn) {
			$element.find('.accordion-toggle').first().text(this.attr('title'));
			postProcessFn();
		}
	});
	return {
		ThumbnailBlock: ThumbnailBlock,
		SpoilerBlock: SpoilerBlock,
	};
});