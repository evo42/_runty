define([
        'aloha',
        'aloha/plugin',
        'jquery',
        'ui/ui',
        'ui/button',
        'ui/toggleButton',
        'ui/text',
        'ui/utils',
        'block/blockmanager',
        'bootstrapui/block',
        'image/image-plugin',
        ], function (Aloha,
      		  Plugin,
      		  jQuery,
      		  Ui,
      		  Button,
      		  ToggleButton,
      		  Text,
      		  UiUtil,
      		  BlockManager,
      		  bootstrapBlock,
      		  imagePlugin) {
	'use strict';

	/**
	 * Register the plugin with unique name
	 */
	return Plugin.create('bootstrapui', {
		defaults : {},
		dependencies : [],
		init : function () {
			var plugin = this;
			BlockManager.registerBlockType('ThumbnailBlock', bootstrapBlock.ThumbnailBlock);
			BlockManager.registerBlockType('SpoilerBlock', bootstrapBlock.SpoilerBlock);
			var spoilerbutton = Ui.adopt("insertSpoilers", Button, {
				tooltip: "spoiler",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-warning-sign',
				click: function(){
					plugin.createSpoiler();
				}
			});
			var spoilerbutton = Ui.adopt("formatSpoilers", Button, {
				tooltip: "spoiler",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-warning-sign',
				click: function(){
					plugin.createSpoiler();
				}
			});
			var thumbnailbutton = Ui.adopt("insertThumbnail", Button, {
				tooltip: "thumbnail",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-picture',
				click: function(){
					plugin.createThumbnail();
				}
			});
			var thumbnailbutton = Ui.adopt("formatThumbnail", Button, {
				tooltip: "thumbnail",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-picture',
				click: function(){
					plugin.createThumbnail();
				}
			});
			var thumbnailbutton = Ui.adopt("wrapThumbnail", Button, {
				tooltip: "thumbnail",
				scope: 'image',
				icon: 'aloha-icon icon-picture',
				click: function(){
					plugin.wrapThumbnail();
				}
			});
			
			
			this._addThumbnailUI();
			this._addSpoilerUI();
			
			this.bindInteractions();
		},
		
		_addSpoilerUI: function() {
			var plugin = this;
			var scope = 'Aloha.Block.SpoilerBlock';
			this._spoilerTitleField = Ui.adopt("spoilerTitle", Text, {
				scope: scope,
				setValue: function(value) {
					BlockManager._activeBlock.attr('title', value);
				},
				init: function() {
					this._super();
					this.element.css('width', '400px');
					this.element = UiUtil.wrapWithLabel("Title", this.element);
				},
			});
			this._spoilerRemove = Ui.adopt("spoilerRemove", Button, {
				tooltip: "remove spoiler wrapping",
				icon: 'aloha-img icon-minus',
				scope: scope,
				click : function () {
					plugin.removeSpoiler();
				}
			});
			
		},
		
		_addThumbnailUI: function() {
			var scope = 'Aloha.Block.ThumbnailBlock';
			var plugin = this;
			
			this._thumbnailSrcField = Ui.adopt("thumbnailSrc", Text, {
				scope: scope,
				setValue: function(value) {
					BlockManager._activeBlock.attr('image', value);
				},
				init: function() {
					this._super();
					this.element.css('width', '240px');
					this.element = UiUtil.wrapWithLabel("Source", this.element);
				},
			});
			this._thumbnailCaptionField = Ui.adopt("thumbnailCaption", Text, {
				scope: scope,
				setValue: function(value) {
					BlockManager._activeBlock.attr('caption', value);
				},
				init: function() {
					this._super();
					this.element.css('width', '230px');
					this.element = UiUtil.wrapWithLabel("Caption", this.element);
				},
			});
			this._thumbnailRemove = Ui.adopt("thumbnailRemove", Button, {
				tooltip: "remove thumbnail wrapping",
				icon: 'aloha-img icon-minus',
				scope: scope,
				click : function () {
					plugin.removeThumbnail();
				}
			});
			this._thumbnailAlignLeftButton = Ui.adopt("thumbnailAlignLeft", Button, {
				tooltip: "align left",
				icon: 'aloha-img icon-align-left',
				scope: scope,
				click : function () {
					BlockManager._activeBlock.attr('position', 'left');
				}
			});

			this._thumbnailAlignRightButton = Ui.adopt("thumbnailAlignRight", Button, {
				tooltip: "align right",
				icon: 'aloha-img icon-align-right',
				scope: scope,
				click : function () {
					BlockManager._activeBlock.attr('position', 'right');
				}
			});

			this._thumbnailAlignNoneButton = Ui.adopt("thumbnailAlignNone", Button, {
				tooltip: "align none",
				icon: 'aloha-img icon-align-justify',
				scope: scope,
				click : function () {
					BlockManager._activeBlock.attr('position', '');
				}
			});
		},
		
		bindInteractions: function () {
			var plugin = this;
			Aloha.bind( 'aloha-editable-created', function (event, editable) {
				jQuery('.accordion-inner', editable.obj).addClass('aloha-editable');
				jQuery('.accordion-group', editable.obj).alohaBlock({'aloha-block-type': 'SpoilerBlock'}).find('.collapse').collapse('show');

				jQuery('.thumbnail', editable.obj).alohaBlock({'aloha-block-type': 'ThumbnailBlock'});
				jQuery('.thumbnail img', editable.obj).addClass('aloha-ui'); //this prevents the image plugin from activating
			});
			Aloha.bind( 'aloha-editable-destroyed', function (event, editable) {
				jQuery('.accordion-inner', editable.obj).mahalo();
				var spoilers = jQuery('.accordion-group', editable.obj);
				jQuery('.collapse', spoilers).collapse('hide');
				spoilers.mahaloBlock();

				jQuery('.thumbnail', editable.obj).mahaloBlock();
			});
			BlockManager.bind('block-activate', function (blocks) {
				if (blocks[0].title == "ThumbnailBlock") {
					plugin._thumbnailSrcField.element.find('input').val(blocks[0].attr('image'));
					plugin._thumbnailCaptionField.element.find('input').val(blocks[0].attr('caption'));
				}
				else if (blocks[0].title == "SpoilerBlock") {
					plugin._spoilerTitleField.element.find('input').val(blocks[0].attr('title'));
				}
			});
		},
		
		createSpoiler: function() {
			// Check if there is an active Editable and that it contains an element (= .obj)
			if ( Aloha.activeEditable && typeof Aloha.activeEditable.obj !== 'undefined' ) {
				var id = GENTICS.Utils.guid();
				var range = Aloha.Selection.getRangeObject();
				var spoiler = jQuery('<div class="accordion-group"><div class="accordion-body collapse" id="'+id+'" style=""><div class="accordion-inner aloha-editable"></div></div></div>');

				if ( range.isCollapsed() ) {
					GENTICS.Utils.Dom.insertIntoDOM(
							spoiler,
							range,
							Aloha.activeEditable.obj
					);
				} else {
					this.wrapMarkup( range, spoiler, true );
					spoiler = jQuery("#"+id).parent();
				}
				var spoilerHeader = jQuery('<div class="accordion-heading"> \
						<a class="accordion-toggle" data-toggle="collapse" href="#'+id+'" rel="nofollow" target="_blank" title="Show Spoiler">Spoiler</a> \
						</div>');
				spoiler.prepend(spoilerHeader);
				
				spoiler.alohaBlock({'aloha-block-type': 'SpoilerBlock'});
				BlockManager.getBlock(spoiler).activate();
				jQuery('.collapse', spoiler).collapse('show');
			}
		},


		wrapMarkup: function (rangeObject, markup, nesting) {
			var sc = rangeObject.startContainer;
			var so = rangeObject.startOffset;
			if (1 === sc.nodeType && sc.childNodes[so] && 3 === sc.childNodes[so].nodeType) {
				rangeObject.correctRange();
			}

			// split partially contained text nodes at the start and end of the range
			if (rangeObject.startContainer.nodeType === 3
					&& rangeObject.startOffset > 0
					&& rangeObject.startOffset < rangeObject.startContainer.data.length) {
				GENTICS.Utils.Dom.split(rangeObject, jQuery(rangeObject.startContainer).parent(), false);
			}
			if (rangeObject.endContainer.nodeType === 3 && rangeObject.endOffset > 0 && rangeObject.endOffset < rangeObject.endContainer.data.length) {
				GENTICS.Utils.Dom.split(rangeObject, jQuery(rangeObject.endContainer).parent(), true);
			}

			var rangeTree = rangeObject.getRangeTree();
			var selectedElements = new Array();
			this.recursiveAddMarkup(selectedElements, rangeTree, markup, rangeObject, nesting);
			var e = jQuery(selectedElements);
			e.wrapAll(markup);

			GENTICS.Utils.Dom.doCleanup({
				'merge': true,
				'removeempty': true
			}, rangeObject);
		},
		recursiveAddMarkup: function (elements, rangeTree, markup, rangeObject, nesting) {
			var i, innerRange, rangeLength;

			for (i = 0, rangeLength = rangeTree.length; i < rangeLength; ++i) {
				if (rangeTree[i].type == 'full' && GENTICS.Utils.Dom.allowsNesting(markup.get(-1), rangeTree[i].domobj)) {
					if ((nesting || rangeTree[i].domobj.nodeName != markup.get(-1).nodeName) && (rangeTree[i].domobj.nodeType !== 3 || jQuery.trim(rangeTree[i].domobj.data).length !== 0)) {
						elements.push(rangeTree[i].domobj);
					}
				} else {
					if ((nesting || (rangeTree[i].domobj && rangeTree[i].domobj.nodeName !== markup.get(-1).nodeName)) && rangeTree[i].children && rangeTree[i].children.length > 0) {
						this.recursiveAddMarkup(elements, rangeTree[i].children, markup);
					}
				}
			}
		},


		removeSpoiler: function ( ) {
			var spoiler = BlockManager._activeBlock;

			if ( spoiler && spoiler.title == 'SpoilerBlock' ) {
				//deactivate block
				spoiler.unblock();
				//remove header
				$('.accordion-heading', spoiler.$element).first().remove();
				//remove inner layers
				$('.accordion-inner', spoiler.$element).first().contents().unwrap().unwrap().unwrap();
			}
		},
		
		wrapThumbnail: function() {
			if ( Aloha.activeEditable && typeof Aloha.activeEditable.obj !== 'undefined' ) {
				var thumbnail = jQuery('<div class="thumbnail"></div>');
				imagePlugin.endResize();
				
				var $img = imagePlugin.imageObj;
				
				$img.wrap(thumbnail);
				thumbnail = $img.parent();
				thumbnail.append('<div class="caption">Caption</div>');

				
				thumbnail.alohaBlock({'aloha-block-type': 'ThumbnailBlock'});
				BlockManager.getBlock(thumbnail).activate();
			}
		},
		createThumbnail: function() { //pull-left, pull-right

			if ( Aloha.activeEditable && typeof Aloha.activeEditable.obj !== 'undefined' ) {
				var thumbnail = jQuery('<div class="thumbnail"><img src="" class="aloha-ui" /><div class="caption">Caption</div></div>');
				thumbnail.alohaBlock({'aloha-block-type': 'ThumbnailBlock'});
				BlockManager.getBlock(thumbnail).activate();
				var range = Aloha.Selection.getRangeObject();

				GENTICS.Utils.Dom.insertIntoDOM(
						thumbnail,
						range,
						Aloha.activeEditable.obj
				);
			}
		},
		
		removeThumbnail: function ( ) {
			var thumbnail = BlockManager._activeBlock;

			if ( thumbnail && thumbnail.title == 'ThumbnailBlock' ) {
				//deactivate block
				thumbnail.unblock();
				//remove caption
				$('.caption', thumbnail.$element).first().remove();
				//remove wrapping
				thumbnail.$element.contents().unwrap();
			}
		},

	});
});