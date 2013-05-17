define(['aloha/plugin', 'aloha/console', 'util/dom'], function (Plugin, console, Dom) {
    'use strict';

    return Plugin.create('hearts', {
        defaults: {
            color: null
        },

        init: function () {
            var plugin = this;

            Aloha.bind('aloha-smart-content-changed', function ($event, params) {

                if (params.triggerType == 'keypress') {
                    var range = Aloha.getSelection().getRangeAt(0),
                        contents = params.editable.getContents(),
                        correction = 0,
                        $span, html, replacement, domNodes, selectNode, rangeObject;

                    if (plugin.settings.color) {
                        $span = $('<span>').css('color', plugin.settings.color).attr('data-is-new', '1').html('&hearts;');
                        html = $('<div />').append($span).html();
                        replacement = contents.replace(/&lt;3/g, html);
                    } else {
                        replacement = contents.replace(/&lt;3/g, '&hearts;');
                        correction = 1; // fix: we replace <3 to ♥ = -1 as correction
                    }
                    replacement = replacement.replace(/:-\)/g, '&#9786;'); // smiley easter egg ;-)

                    if (contents.length != replacement.length) {
                        domNodes = Aloha.activeEditable.setContents(replacement, true);

                        if (plugin.settings.color) {
                            selectNode = 0;
                            $.each(domNodes, function () {
                                if ($(this).attr('data-is-new')) {
                                    $(this).removeAttr('data-is-new');
                                    return false;
                                }
                                selectNode++;
                            });

                            rangeObject = Dom.setCursorAfter(domNodes.get(selectNode));
                            rangeObject.startOffset = rangeObject.endOffset = 1; // fix: put cursor after the space which triggers  smart-content-change
                            rangeObject.select();
                        } else {
                            rangeObject = new GENTICS.Utils.RangeObject();
                            rangeObject.startContainer = range.startContainer;
                            rangeObject.startOffset = range.startOffset - correction;
                            rangeObject.endContainer = range.endContainer;
                            rangeObject.endOffset = range.endOffset - correction;
                        }
                        rangeObject.select();
                    }
                }
            });
        }
    });
});