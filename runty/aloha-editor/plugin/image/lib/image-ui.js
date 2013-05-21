/* image-ui.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define(['jquery', 'util/class', 'i18n!image/nls/i18n', 'i18n!aloha/nls/i18n', 'ui/ui', 'ui/scopes', 'ui/button', 'ui/toggleButton', 'ui/port-helper-attribute-field'],

function (
jQuery,
Class,
i18n,
i18nCore,
Ui,
Scopes,
Button,
ToggleButton,
AttributeField) {
	'use strict';

	var $ = jQuery;
	var GENTICS = window.GENTICS;
	var Aloha = window.Aloha;

	/**
	 * Toolbar elements for Image plugin
	 *
	 * @class MyClass
	 */
	return Class.extend({
		/**
		 * Empty constructor
		 *
		 * @method
		 * @constructor
		 */
		_constructor: function () {

		},

		/**
		 * Initialize Floating menu buttons according to plugin config
		 */
		init: function (plugin) {
			plugin.uiControl = this;
			this.plugin = plugin;

			Scopes.createScope(plugin.name, 'Aloha.empty');

			this._addUIInsertButton();
			this._addUIMetaButtons();
			this._addUIResetButton();
			this._addUIAlignButtons();
			this._addUIMarginButtons();
			this._addUICropButtons();
			this._addUIResizeButtons();
			this._addUIAspectRatioToggleButton();

			//	TODO fix the function and reenable this button 
			//	this._addNaturalSizeButton();
		},

		/**
		 * Adds the aspect ratio toggle button to the floating menu
		 */
		_addUIAspectRatioToggleButton: function () {
			var plugin = this.plugin;

			this._imageCnrRatioButton = Ui.adopt("imageCnrRatio", ToggleButton, {
				tooltip: i18n.t('button.toggle.tooltip'),
				icon: 'aloha-img aloha-icon-cnr-ratio',
				scope: plugin.name,
				click: function () {
					plugin.toggleKeepAspectRatio();
				}
			});

			// If the setting has been set to a number or false we need to activate the 
			// toggle button to indicate that the aspect ratio will be preserved.
			if (plugin.settings.fixedAspectRatio !== false) {
				this._imageCnrRatioButton.setState(true);
				plugin.keepAspectRatio = true;
			}
		},

		/**
		 * Adds the reset button to the floating menu for the given tab 
		 */
		_addUIResetButton: function () {
			var plugin = this.plugin;

			this._imageCnrResetButton = Ui.adopt("imageCnrReset", Button, {
				tooltip: i18n.t('Reset'),
				icon: 'aloha-img aloha-icon-cnr-reset',
				scope: plugin.name,
				click: function () {
					plugin.reset();
				}
			});
		},

		/**
		 * Adds the insert button to the floating menu
		 */
		_addUIInsertButton: function () {
			var plugin = this.plugin;

			this._insertImageButton = Ui.adopt("insertImage", Button, {
				tooltip: i18n.t('button.addimg.tooltip'),
				icon: 'aloha-img aloha-image-insert',
				scope: 'Aloha.continuoustext',
				click: function () {
					plugin.insertImg();
				}
			});
		},

		/**
		 * Adds the ui meta fields (search, title) to the floating menu. 
		 */
		_addUIMetaButtons: function () {
			var plugin = this.plugin;

			this.imgSrcField = AttributeField({
				label: i18n.t('field.img.src.label'),
				labelClass: 'aloha-image-input-label',
				tooltip: i18n.t('field.img.src.tooltip'),
				name: 'imageSource',
				scope: plugin.name
			});

			this.imgSrcField.setTemplate('<img src="{url}" /><span><b>{name}</b><br/>{description}</span>');
			
			this.imgSrcField.setObjectTypeFilter(plugin.objectTypeFilter);

			this.imgTitleField = AttributeField({
				label: i18n.t('field.img.title.label'),
				labelClass: 'aloha-image-input-label',
				tooltip: i18n.t('field.img.title.tooltip'),
				name: 'imageTitle',
				scope: plugin.name
			});

		},

		/**
		 * Adds the ui align buttons to the floating menu
		 */
		_addUIAlignButtons: function () {
			var plugin = this.plugin;

			this._imageAlignLeftButton = Ui.adopt("imageAlignLeft", Button, {
				tooltip: i18n.t('button.img.align.left.tooltip'),
				icon: 'aloha-img aloha-image-align-left',
				scope: plugin.name,
				click: function () {
					var el = jQuery(plugin.getPluginFocus());
					el.add(el.parent()).css('float', 'left');
				}
			});

			this._imageAlignRightButton = Ui.adopt("imageAlignRight", Button, {
				tooltip: i18n.t('button.img.align.right.tooltip'),
				icon: 'aloha-img aloha-image-align-right',
				scope: plugin.name,
				click: function () {
					var el = jQuery(plugin.getPluginFocus());
					el.add(el.parent()).css('float', 'right');
				}
			});

			this._imageAlignNoneButton = Ui.adopt("imageAlignNone", Button, {
				tooltip: i18n.t('button.img.align.none.tooltip'),
				icon: 'aloha-img aloha-image-align-none',
				scope: plugin.name,
				click: function () {
					var el = jQuery(plugin.getPluginFocus());
					el.add(el.parent()).css({
						'float': 'none',
						display: 'inline-block'
					});
				}
			});
		},

		/**
		 * Adds the ui margin buttons to the floating menu
		 */
		_addUIMarginButtons: function () {
			var plugin = this.plugin;

			this._imageIncPaddingButton = Ui.adopt("imageIncPadding", Button, {
				tooltip: i18n.t('padding.increase'),
				icon: 'aloha-img aloha-image-padding-increase',
				scope: plugin.name,
				click: function () {
					jQuery(plugin.getPluginFocus()).increase('padding');
				}
			});

			this._imageDecPaddingButton = Ui.adopt("imageDecPadding", Button, {
				tooltip: i18n.t('padding.decrease'),
				icon: 'aloha-img aloha-image-padding-decrease',
				scope: plugin.name,
				click: function () {
					jQuery(plugin.getPluginFocus()).decrease('padding');
				}
			});
		},

		/**
		 * Adds the crop buttons to the floating menu
		 */
		_addUICropButtons: function () {
			var plugin = this.plugin;

			Scopes.createScope('Aloha.img', ['Aloha.global']);

			this._imageCropButton = Ui.adopt("imageCropButton", ToggleButton, {
				tooltip: i18n.t('Crop'),
				icon: 'aloha-img aloha-icon-cnr-crop',
				scope: plugin.name,
				click: function () {
					if (this.getState()) {
						plugin.crop();
					} else {
						plugin.endCrop();
					}
				}
			});
		},

		/**
		 * Adds the resize buttons to the floating menu
		 */
		_addUIResizeButtons: function () {
			var plugin = this.plugin;

			// Manual resize fields
			this.imgResizeHeightField = AttributeField({
				label: i18n.t('height'),
				labelClass: 'aloha-image-input-label',
				name: "imageResizeHeight",
				width: 50,
				scope: plugin.name
			});
			this.imgResizeHeightField.maxValue = plugin.settings.maxHeight;
			this.imgResizeHeightField.minValue = plugin.settings.minHeight;

			this.imgResizeWidthField = AttributeField({
				label: i18n.t('width'),
				labelClass: 'aloha-image-input-label',
				name: "imageResizeWidth",
				width: 50,
				scope: plugin.name
			});
			this.imgResizeWidthField.maxValue = plugin.settings.maxWidth;
			this.imgResizeWidthField.minValue = plugin.settings.minWidth;
		},

		/**
		 * Adds the natural size button to the floating menu
		 */
		/*
		  TODO currently deactivated see TODO at call site above.
		_addNaturalSizeButton: function () {
			var plugin = this.plugin;

			this._imageNaturalSizeButton = Ui.adopt("imageNaturalSize", Button, {
				icon: 'aloha-img aloha-image-size-natural',
				label: i18n.t('size.natural'),
				scope: plugin.name,
				click: function () {
					plugin.resetSize();
				}
			});
		},
		*/

		/**
		 * Sets the scope
		 */
		setScope: function () {
			Scopes.setScope(this.plugin.name);
		},

		/**
		 * Redraws UI
		 */
		doLayout: function () {
			// Implementation was removed while porting this plugin to
			// the jqueryui toolbar because it seems to be a hack that
			// is not needed with the new implementation.
		}
	});
});
