/* aloha-editor.js is part of the Runty NoCMS project http://runtyapp.org
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
	bundles: {
		// Path for custom bundle relative from Aloha.settings.baseUrl usually path of aloha.js
		custom: '../../../aloha-editor/plugin/' // '../../../aloha-editor/plugin/' -- '/runty/aloha-editor/plugin/'
	},
	sidebar: {
		open: false,
		disabled: true
	},
	plugins: {
		load: "common/ui, common/format, common/table, common/list, common/link, " +
		"common/highlighteditables, common/block, common/undo, " +
		"common/contenthandler, common/paste, common/commands, common/abbr, " +
		"custom/runty" /*+
		", custom/runty, custom/fontsize, custom/colorselector"*/
	}
};
