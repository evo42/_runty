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

			CopyPaste.selectAllOf(range.startContainer);
			Aloha.execCommand('insertHTML', false, html);
		}

		Aloha.bind('aloha-smart-content-changed', onSmartContentChanged);
		//Aloha.bind('aloha-selection-changed', onSelectionChanged);

	});


    Aloha.require(['ui/surface','util/range-context', 'aloha/jquery'], function(Surface, RangeContext, $) {

      // Do preseve the range when clicking outside the editable.
      // You should do this for all menu areas.
      Surface.trackRange($('.aloha-editor-image-toolbar'));

      // We want to activate and deactivate our components depending on an image is selected.
      Aloha.bind('aloha-image-selected', function (jEvent, aEvent){
          window.console.log('image selected');
        $('#aloha-component-image-source').removeAttr('disabled');
        $('#aloha-component-image-align-group>button').removeClass('disabled');
      });
      Aloha.bind('aloha-image-unselected', function (jEvent, aEvent){
        $('#aloha-component-image-source').attr('disabled','');
        $('#aloha-component-image-align-group>button').addClass('disabled');
      });

    });
/*
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
*/    
})(window, window.markdown, window.toMarkdown);
