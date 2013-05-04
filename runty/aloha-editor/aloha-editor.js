/* aloha-editor.js is part of the Runty. NoCMS project http://runtyapp.org
*
* Runty is a handy NoCMS utilizing the power of Aloha Editor
* -- a modern WYSIWYG HTML5 inline editing library and editor.
*
*
* Runty is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or any later version.
*
* Runty is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*
* Online: https://www.gnu.org/licenses/gpl-2.0.html
*/

if (window.Aloha === undefined || window.Aloha === null) {
	var Aloha = window.Aloha = {};
}

/*
This is a minimal Aloha Editor configuration

In this Aloha Editor within Runty we add a custom plugin.
This plugin is located in our own specific plugin bundle.
*/
Aloha.settings = {
	requireConfig: {
		paths: {
			'ui/ui-plugin': '../plugins/common/ui-a-la-carte/lib/ui-plugin',
			'ui/component': '../plugins/common/ui-a-la-carte/lib/component',
			'ui/button'   : '../plugins/common/ui-a-la-carte/lib/button',
			'ui/toggleButton'   : '../plugins/common/ui-a-la-carte/lib/toggleButton',
			'ui/port-helper-attribute-field': '../plugins/common/ui-a-la-carte/lib/port-helper-attribute-field',
			'ui/port-helper-multi-split': '../plugins/common/ui-a-la-carte/lib/port-helper-multi-split',
			'ui/original-component': '../plugins/common/ui/lib/component',
			'ui/original-port-helper-attribute-field': '../plugins/common/ui/lib/port-helper-attribute-field',
			'ui/original-port-helper-multi-split': '../plugins/common/ui/lib/port-helper-multi-split',
			'ui/original-button': '../plugins/common/ui/lib/button',
			'ui/original-toggleButton': '../plugins/common/ui/lib/toggleButton'
		}
	},
	repositories: {
		linklist: {
			data: [
				{ name: 'Aloha Editor Developers Wiki', url:'https://github.com/alohaeditor/Aloha-Editor/wiki', type:'website', weight: 0.50 },
				{ name: 'Aloha Editor - The HTML5 Editor', url:'http://aloha-editor.com', type:'website', weight: 0.90 },
				{ name: 'Aloha Editor Demo', url:'http://www.aloha-editor.com/demos.html', type:'website', weight: 0.75 },
				{ name: 'Aloha Editor Wordpress Demo', url:'http://www.aloha-editor.com/demos/wordpress-demo/index.html', type:'website', weight: 0.75 },
				{ name: 'Aloha Editor Logo', url:'http://www.aloha-editor.com/images/aloha-editor-logo.png', type:'image', weight: 0.10 }
			]
		}
	},
	bundles: {
		// Path for custom bundle relative from Aloha.settings.baseUrl usually path of aloha.js
		custom: '../../../aloha-editor/plugin/'
	},
	sidebar: {
		open: false,
		disabled: true
	},
	plugins: {
		load: "common/ui, common/format, common/table, common/list, common/link, common/image, " +
		"common/block, common/undo, common/characterpicker, common/horizontalruler, " +
		"common/contenthandler, common/paste, common/commands, common/abbr, common/dom-to-xhtml, common/align, " +
		"custom/runty" /*+
		", common/highlighteditables, extra/imagebrowser, extra/linkbrowser, extra/metaview, extra/listenforcer, extra/headerids"
		", custom/runty, custom/fontsize, custom/colorselector"*/
	}
};

