define([
	'aloha',
	'aloha/plugin',
	'jquery',
	'aloha/contenthandlermanager',
	'videoembed/videoembedcontenthandler',
	'videoembed/removeextrabrcontenthandler',
   'ui/ui',
   'ui/button',
   'ui/text',
   'ui/utils',
   'block/blockmanager',
   'videoembed/block',
], function (Aloha,
			 Plugin,
			 jQuery,
			 ContentHandlerManager,
			 VideoEmbedContentHandler,
			 RemoveExtraBrContentHandler,
			 Ui,
			 Button,
			 Text,
			 UiUtil,
			 BlockManager,
			 bootstrapBlock) {
	'use strict';

	/**
	 * Register the plugin with unique name
	 */
	var VideoEmbedPlugin = Plugin.create('videoembed', {
		defaults : {},
		dependencies : [],
		init : function () {
			var plugin = this;
			BlockManager.registerBlockType('VideoBlock', bootstrapBlock.VideoBlock);
			ContentHandlerManager.register( 'videoembed', VideoEmbedContentHandler );
			ContentHandlerManager.register( 'removebr', RemoveExtraBrContentHandler );

			var videobutton = Ui.adopt("addVideo", Button, {
				tooltip: "video",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-facetime-video',
				click: function(){
					plugin.createVideo();
				}
			});
			var videobutton = Ui.adopt("insertVideo", Button, {
				tooltip: "video",
				scope: 'Aloha.continuoustext',
				icon: 'aloha-icon icon-facetime-video',
				click: function(){
					plugin.createVideo();
				}
			});
			
			this.bindInteractions();
			this._addVideoUI();
		},
		bindInteractions: function () {
			var plugin = this;
			Aloha.bind( 'aloha-editable-created', function (event, editable) {
				jQuery('iframe', editable.obj).wrap('<div />').parent().alohaBlock({'aloha-block-type': 'VideoBlock'});
			});
			Aloha.bind( 'aloha-smart-content-changed', function ( event, editable ) {
				if ( Aloha.activeEditable ) {
					jQuery('[contenteditable!="false"] > iframe', editable.obj).wrap('<div />').parent().alohaBlock({'aloha-block-type': 'VideoBlock'});
				}
			});
			Aloha.bind( 'aloha-editable-destroyed', function (event, editable) {
				var iframe = jQuery('iframe', editable.obj);
				iframe.parent().mahaloBlock();
				iframe.unwrap();
			});
			BlockManager.bind('block-activate', function (blocks) {
				if (blocks[0].title == "VideoBlock") {
					plugin._videoSrcField.element.find('input').val(blocks[0].attr('source'));
				}
			});
		},
		_addVideoUI: function() {
			var scope = 'Aloha.Block.VideoBlock';
			this._videoSrcField = Ui.adopt("videoSrc", Text, {
				scope: scope,
				setValue: function(value) {
					BlockManager._activeBlock.attr('source', value);
				},
				init: function() {
					this._super();
					this.element.css('width', '500px');
					this.element = UiUtil.wrapWithLabel("Embed URL", this.element);
				},
			});
			
		},
		createVideo: function() {
			// Check if there is an active Editable and that it contains an element (= .obj)
			if ( Aloha.activeEditable && typeof Aloha.activeEditable.obj !== 'undefined' ) {
				var video = jQuery('<div><iframe src="http://www.youtube.com/embed/" frameborder="0" allowfullscreen></iframe></div>');
				video.alohaBlock({'aloha-block-type': 'VideoBlock'});
				BlockManager.getBlock(video).activate();

				GENTICS.Utils.Dom.insertIntoDOM(
						video,
						Aloha.Selection.getRangeObject(),
						Aloha.activeEditable.obj
				);
			}
		},
	});

	return VideoEmbedPlugin;
});