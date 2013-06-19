/* Runty. The NoCMS JavaScript App */

(function (window, markdown, toMarkdown) {
	'use strict';

	Aloha.require([
		'aloha',
		'aloha/jquery',
		'aloha/copypaste'
	], function (
		Aloha,
		$,
		CopyPaste
	) {
		function onSelectionChanged($event, params) {
			var md = toMarkdown(Aloha.activeEditable.getContents());
			$('#markdown').val(md);
		}

		function onSmartContentChanged($event, params) {
			if (params.triggerType !== 'keypress') {
				return false;
			}

			var range = Aloha.getSelection().getRangeAt(0),
				contents = range.startContainer.data,
				html;

			if (!contents) {
				return false;
			}

			html = markdown.toHTML(contents);

			if ($(html).is('p')) {
				html = $(html).html();
			}
window.console.log(html);
window.console.log(range.startContainer);
			CopyPaste.selectAllOf(range.startContainer);
			Aloha.execCommand('insertHTML', false, html);
		}

		Aloha.bind('aloha-smart-content-changed', onSmartContentChanged);
		//Aloha.bind('aloha-selection-changed', onSelectionChanged);

	});

    // sync markdown textarea to aloha editor html
	function TextareaEditor(input, preview) {
		this.update = function () {
			preview.innerHTML = markdown.toHTML(input.value);
		};
		input.editor = this;
		this.update();
	}
    new TextareaEditor(
		document.getElementById('markdown'),
		document.getElementById('html')
	);
    
})(window, window.markdown, window.toMarkdown);
