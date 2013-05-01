/**
 * Aloha.Colorselector
 * The colorselector allows the change of color/backgroundcolor
 * Author: Updates from Jeremy Strouse, original from Simioana Mihai (Bluematrix LLC)
 * This is in parts based on the Aloha characterpicker plugin
 */

define(
[ 'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'aloha/floatingmenu',
	'i18n!colorselector/nls/i18n',
	'i18n!aloha/nls/i18n',
        'css!colorselector/css/colorselector.css'],
function (Aloha, jQuery, Plugin, FloatingMenu,i18n, i18nCore){
    "use strict";
    var
		GENTICS = window.GENTICS,
		$ = jQuery,
		ns  = 'aloha-colorselector',
		uid = +new Date,
		animating = false;

    function Colorselector(colors, onSelectCallback) {
		var self = this;
        self.$colorArg = "";
		self.$node = jQuery('<table class="aloha-colorselector-overlay" role="dialog"><tbody></tbody></table>');
		// don't let the mousedown bubble up. otherwise there won't be an activeEditable
		self.$node.mousedown(function(e) {
			return false;
		});
		self.$tbody = self.$node.find('tbody');
		self.$node.appendTo(jQuery('body'));
		self._createColorButtons(self.$node, colors, onSelectCallback);
		self._initHideOnDocumentClick();
		self._initHideOnEsc();
		self._initCursorFocus(onSelectCallback);
		self._initEvents();
	}

    /**
         * Coverts hexidecimal string #00ffcc into rgb array [0, 255, 127]
         *
         * @param {String} hex - Hexidecimal string representing color. In the form
         *						 #ff3344 or #f34
         * @return {Array} rgb representation of hexidecimal color
         */
        function hex2rgb (hex) {
            var hex = hex.replace('#', '').split('');

            if (hex.length == 3) {
                hex[5] = hex[4] = hex[2];
                hex[3] = hex[2] = hex[1];
                hex[1] = hex[0];
            }

            var rgb = [];

            for (var i = 0; i < 3; ++i) {
                rgb[i] = parseInt('0x' + hex[i * 2] + hex[i * 2 + 1], 16);
            }

            return rgb;
        };

     // ------------------------------------------------------------------------
	// Plugin
	// ------------------------------------------------------------------------
    Colorselector.prototype = {
            show: function( insertButton, colorArg) {
                var self = this;
                // position the overlay relative to the insert-button
                self.$node.css(jQuery(insertButton).offset());
                self.$node.show();
                self.$colorArg = colorArg;
                // focus the first color
                self.$node.find('.focused').removeClass('focused');
                jQuery(self.$node.find('td')[0]).addClass('focused');
            },
            _initHideOnDocumentClick: function() {
                var self = this;
                // if the user clicks somewhere outside of the layer, the layer should be closed
                // stop bubbling the click on the create-dialog up to the body event
                self.$node.click(function(e) {
                    e.stopPropagation();
                });
                // hide the layer if user clicks anywhere in the body
                jQuery('body').click(function(e) {
                    var overlayVisibleAndNotTarget
                        =  (self.$node.css('display') === 'table')
                        && (e.target != self.$node[0])
                        // don't consider clicks to the 'show' button.
                        && !jQuery(e.target).is('button.aloha-button-colorselector')
                        && !jQuery(e.target).is('button.aloha-button-fontcolorselector');
                    if(overlayVisibleAndNotTarget) {
                        self.$node.hide();
                    }
                });
            },
            _initHideOnEsc: function() {
                var self = this;
                // escape closes the overlay
                jQuery(document).keyup(function(e) {
                    var overlayVisibleAndEscapeKeyPressed = (self.$node.css('display') === 'table') && (e.keyCode === 27);
                    if(overlayVisibleAndEscapeKeyPressed) {
                        self.$node.hide();
                    }
                });
            },
            _initCursorFocus: function( onSelectCallback ) {
                var self = this;
                // you can navigate through the color table with the arrow keys
                // and select one with the enter key
                var $current, $next, $prev, $nextRow, $prevRow;
                var movements = {
                    13: function select() {
                        $current = self.$node.find('.focused');
                        self.$node.hide();
                        onSelectCallback($current.text());
                    },
                    37: function left() {
                        $current = self.$node.find('.focused');
                        $prev = $current.prev().addClass('focused');
                        if($prev.length > 0) {
                            $current.removeClass('focused');
                        }
                    },
                    38: function up() {
                        $current = self.$node.find('.focused');
                        $prevRow = $current.parent().prev();
                        if($prevRow.length > 0) {
                            $prev = jQuery($prevRow.children()[$current.index()]).addClass('focused');
                            if($prev.length > 0) {
                                $current.removeClass('focused');
                            }
                        }
                    },
                    39: function right() {
                        $current = self.$node.find('.focused');
                        $next = $current.next().addClass('focused');
                        if($next.length > 0) {
                            $current.removeClass('focused');
                        }
                    },
                    40: function down() {
                        $current = self.$node.find('.focused');
                        $nextRow = $current.parent().next();
                        if($nextRow.length > 0) {
                            $next = jQuery($nextRow.children()[$current.index()]).addClass('focused');
                            if($next.length > 0) {
                                $current.removeClass('focused');
                            }
                        }
                    }
                };
                jQuery(document).keydown(function(e) {
                    e.stopPropagation( );
                    var isOverlayVisible = self.$node.css('display') === 'table';
                    if(isOverlayVisible) {
                        // check if there is a move-command for the pressed key
                        var moveCommand = movements[e.keyCode];
                        if(moveCommand) {
                            moveCommand();
                            return false;
                        }
                    }
                });
            },
            _initEvents: function() {
                var self = this;
                // when the editable is deactivated, hide the layer
                Aloha.bind('aloha-editable-deactivated', function(event, rangeObject) {
                    self.$node.hide();
                });
            },
            _createColorButtons: function($node, colors, onSelectCallback) {
                var self = this;
                function mkButton(colorCode) {
                    return jQuery("<td style='BACKGROUND-COLOR: "+colorCode+"'>&nbsp;</td>")
                        .mouseover(function() {
                            jQuery(this).addClass('mouseover');
                        })
                        .mouseout(function() {
                            jQuery(this).removeClass('mouseover');
                        })
                        .click(function(e) {
                            self.$node.hide();
                            onSelectCallback(colorCode,self.$colorArg);
                            return false;
                        });
                }
                function addRow() {
                    return jQuery('<tr></tr>').appendTo(self.$tbody);
                }
                var colorList = jQuery.grep(
                    colors.split(' '),
                    function filterOutEmptyOnces(e) {
                        return e != '';
                    }
                );
                var i=0, colorCode;
                var $row;
                while(colorCode = colorList[i]) {
                    // make a new row every 10 colors
                    if(((i%10)===0)) {
                        $row = addRow();
                    }
                    mkButton(colorCode).appendTo($row);
                    i++;
                }
            }
        };

        return Plugin.create('colorselector', {
            _constructor: function(){
                this._super('colorselector');
            },
            languages: ['en'],
            init: function() {
                var self = this;
                if (!Aloha.settings.plugins.colorselector) {
                    Aloha.settings.plugins.colorselector = {}
                }
                self.settings = Aloha.settings.plugins.colorselector || {};
                if(!self.settings.colors) {
                    self.settings.colors = '#ff0000 #ffff00 #00ff00 #00ffff #0000ff #ff00ff #ffffff #f5f5f5 #dcdcdc #d3d3d3 #c0c0c0 #a9a9a9 #808080 #696969 #000000 #2f4f4f #708090 #778899 #4682b4 #4169e1 #6495ed #b0c4de #7b68ee #6a5acd #483d8b #191970 #000080 #00008b #0000cd #1e90ff #00bfff #87cefa #87ceeb #add8e6 #b0e0e6 #f0ffff #e0ffff #afeeee #00ced1 #5f9ea0 #48d1cc #00ffff #40e0d0 #20b2aa #008b8b #008080 #7fffd4 #66cdaa #8fbc8f #3cb371 #2e8b57 #006400 #008000 #228b22 #32cd32 #00ff00 #7fff00 #7cfc00 #adff2f #98fb98 #90ee90 #00ff7f #00fa9a #556b2f #6b8e23 #808000 #bdb76b #b8860b #daa520 #ffd700 #f0e68c #eee8aa #ffebcd #ffe4b5 #f5deb3 #ffdead #deb887 #d2b48c #bc8f8f #a0522d #8b4513 #d2691e #cd853f #f4a460 #8b0000 #800000 #a52a2a #b22222 #cd5c5c #f08080 #fa8072 #e9967a #ffa07a #ff7f50 #ff6347 #ff8c00 #ffa500 #ff4500 #dc143c #ff0000 #ff1493 #ff00ff #ff69b4 #ffb6c1 #ffc0cb #db7093 #c71585 #800080 #8b008b #9370db #8a2be2 #4b0082 #9400d3 #9932cc #ba55d3 #da70d6 #ee82ee #dda0dd #d8bfd8 #e6e6fa #f8f8ff #f0f8ff #f5fffa #f0fff0 #fafad2 #fffacd #fff8dc #ffffe0 #fffff0 #fffaf0 #faf0e6 #fdf5e6 #faebd7 #ffe4c4 #ffdab9 #ffefd5 #fff5ee #fff0f5 #ffe4e1 #fffafa';
                }
                var insertButton = new Aloha.ui.Button({
                    'name': 'colorselector',
                    'iconClass': 'aloha-button-colorselector',
                    'size': 'small',
                    'onclick': function(element, event) { self.colorselector.show(element.btnEl.dom, "highlight"); },
                    'tooltip': i18n.t('button.colorselector.tooltip'),
                    'toggle': false
                });
                var insertButtonFC = new Aloha.ui.Button({
                    'name': 'fontcolorselector',
                    'iconClass': 'aloha-button-fontcolorselector',
                    'size': 'small',
                    'onclick': function(element, event) { self.colorselector.show(element.btnEl.dom, "color"); },
                    'tooltip': i18n.t('button.fontcolorselector.tooltip'),
                    'toggle': false
                });
                FloatingMenu.addButton(
                    'Aloha.continuoustext',
                    insertButton,
                    i18nCore.t('floatingmenu.tab.format'),
                    1
                );
                FloatingMenu.addButton(
                    'Aloha.continuoustext',
                    insertButtonFC,
                    i18nCore.t('floatingmenu.tab.format'),
                    1
                );
                self.colorselector = new Colorselector(self.settings.colors, self.onColorSelect);
            },
            /**
             * insert a colorspan after selecting it from the list
            */
            onColorSelect: function(colorCode, colorArg) {
                var self = this;
                var tagToUse = "span";
                var classToUse = "class=aloha";
                var cssTag;
                if (colorArg == "color") {
                  cssTag = 'COLOR';
                } else {
                  cssTag = 'BACKGROUND-COLOR';
                }
                var styleToUse = "style='" + cssTag + ": " + colorCode + "'";

                var markup = jQuery('<' + tagToUse + ' ' + classToUse + ' ' + styleToUse + '></' + tagToUse + '>'), rangeObject = Aloha.Selection.rangeObject, selectedCells = jQuery('.aloha-cell-selected');

                // formating workaround for table plugin
                if (selectedCells.length > 0) {
                    var cellMarkupCounter = 0;
                    selectedCells.each(function () {
                        var cellContent = jQuery(this).find('div'), cellMarkup = cellContent.find(tagToUse);

                        if (cellMarkup.length > 0) {
                            // unwrap all found markup text
                            // <td><b>text</b> foo <b>bar</b></td>
                            // and wrap the whole contents of the <td> into <b> tags
                            // <td><b>text foo bar</b></td>
                            cellMarkup.contents().unwrap();
                            cellMarkupCounter++;
                        }
                        cellContent.contents().wrap('<' + tagToUse + ' ' + classToUse + ' ' + styleToUse + '></' + tagToUse + '>');
                    });

                    // remove all markup if all cells have markup
                    if (cellMarkupCounter == selectedCells.length) {
                        selectedCells.find(tagToUse).contents().unwrap();
                    }
                    return false;
                }

                var parents = rangeObject.getSelectionTree();
                var count = 0;
                var partialreplace = false;
                // Loop through all matching markup sections and apply the new CSS
                for (var i = 0; i < parents.length; i++) {
                  if (parents[i].selection.toLowerCase() == "full") {
                    count = 0;
                    jQuery(parents[i].domobj).find('span').each(function () {
                      count += 1;
                      jQuery(this).css(cssTag.toLowerCase(),colorCode);
                    });
                    if (count == 0 && parents.length == 1) {
                      // Maybe we just selected the actual element, so check it's parent
                      jQuery(parents[i].domobj).parent().each(function() { 
                        if (this.nodeName.toLowerCase() == 'span') {
                          count += 1;
                          jQuery(this).css(cssTag.toLowerCase(),colorCode);
                        };
                      });
                    }
                    if (count == 0 || (parents[i].domobj.tagName && parents[i].domobj.tagName.toLowerCase() != 'span')) {
                      if (parents[i].domobj.nodeType == 3)
                        jQuery(parents[i].domobj).wrap(markup);
                      else
                        jQuery(parents[i].domobj).wrapInner(markup);
                    }
                  }
                  else if (parents[i].selection.toLowerCase() == "partial") {
                    partialreplace = true;
                    replacechild(parents[i],tagToUse,classToUse,styleToUse,cssTag,colorCode);
                  }
                };

                // Throws errors if we've added a tag in the middle, so skip it
                // instead of having it error
                if (! partialreplace)
                  rangeObject.select();
                return false;
            }
        });
        function replacechild(item,tagToUse,classToUse,styleToUse,cssTag,colorCode) {
          if (item.domobj.nodeType == 3) {
            var text = item.domobj.data.substr(item.startOffset, item.endOffset - item.startOffset);
            text = '<' + tagToUse + ' ' + classToUse + ' ' + styleToUse + '>' + text + '</' + tagToUse + '>';
            text = item.domobj.data.substr(0,item.startOffset) + text;
            text = text + item.domobj.data.substr(item.endOffset, item.domobj.data.length - item.endOffset);
            jQuery(item.domobj).replaceWith(text);
          }
          else if (item.domobj.tagName.toLowerCase() == tagToUse.toLowerCase() && item.selection == "full") {
            jQuery(item.domobj).css(cssTag.toLowerCase(),colorCode);
            jQuery(item.domobj).find('span').each(function () {
              jQuery(this).css(cssTag.toLowerCase(),colorCode);
            });
          }
          else {
            for (var j = 0; j < item.children.length; j++) {
              if (item.children[j].selection == "partial" || item.children[j].selection == "full")
                replacechild(item.children[j],tagToUse,classToUse,styleToUse,cssTag,colorCode);
            };
          }
        }


});
