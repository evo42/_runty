define(['aloha/plugin'], function (Plugin) {
    'use strict';

    function  createReplacer(replaceHtml, correction) {
        correction.offset = correction.offset || 0;
        return function (match, reference, offset, string) {
            // @todo fix for different length of special stuff
            correction.offset -= match.length - 1;
            if (correction.offset === 0) {
                correction.offset = 2;
            }
            return replaceHtml;
        }
    }

	function onSmartContentChanged($event, params) {
		if (params.triggerType != 'keypress') {
			return false;
		}

		var range = Aloha.getSelection().getRangeAt(0),
			contents = range.startContainer.data,
			correction = {},
			newRange;

		if (!contents) {
			return false;
		}

		if (params.keyCode === 8) {
			// backspace
			var found = contents.lastIndexOf('\u2764');
			if (found == (contents.length - 1)) {
				range.startContainer.data = contents.substr(0, contents.length - 5) + contents.substr(-5).replace(/\u2764/, createReplacer('<\u200B3', correction));
			}
		} else {
			// <3 to ❤
			range.startContainer.data = contents.substr(0, contents.length - 5) + contents.substr(-5).replace(/<3/g, createReplacer('\u2764', correction));
		}

		if (correction.offset) {
			newRange = new GENTICS.Utils.RangeObject(); // TODO: require the module
			newRange.startContainer = range.startContainer;
			newRange.startOffset = range.startOffset + correction.offset;
			newRange.endContainer = range.endContainer;
			newRange.endOffset = range.endOffset + correction.offset;
			newRange.select();
		}
	}

    return Plugin.create('hearts', {
		init: function () {
			Aloha.bind('aloha-smart-content-changed', onSmartContentChanged);
		}
	});
});
