/**
 * Aloha.FontSize
 * The Font Size allows the change of font size of text
 * Author: Jeremy Strouse (jstrouse@strouseconsulting.com)
 * This is in parts based on the Aloha characterpicker plugin and other plugins
 * such as the colorselector plugin and previous version plugins by RecessMobile
 */

define(
[ 'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'aloha/floatingmenu',
	'i18n!fontsize/nls/i18n',
	'i18n!aloha/nls/i18n',
        'css!fontsize/css/fontsize.css'],
function (Aloha, jQuery, Plugin, FloatingMenu,i18n, i18nCore){
    "use strict";
 
    return Plugin.create( 'fontsize', {
      languages: ['en'],
      init: function() {
        if (!Aloha.settings.plugins.fontsize) {
          Aloha.settings.plugins.fontsize = {}
        }
        var that = this,
            buttons = [],
            names = ['increase', 'decrease'],
            tooltips = ['Increase Font Size', 'Decrease Font Size'];
        
        jQuery.each(names, function(index, value){
          buttons.push(new Aloha.ui.Button({
            "name": value,
            "iconClass" : "GENTICS_button_" + value,
            "size" : "small",
            'tooltip': tooltips[index],
            "onclick": function () {
              if (Aloha.activeEditable) {
  		Aloha.activeEditable.obj[0].focus()
  	      }

  	      var newSize;
  	      var markup = jQuery('<span class="aloha"></span>');
              var rangeObject = Aloha.Selection.rangeObject;
              var parents = rangeObject.getSelectionTree();
              var count = 0;
              var partialreplace = false;
              // Loop through all matching markup sections and apply the new CSS
              for (var i = 0; i < parents.length; i++) {
                if (parents[i].selection.toLowerCase() == "full") {
                  count = 0;
                  jQuery(parents[i].domobj).find('span').each(function () {
                    count += 1;
  		    newSize = (parseInt(jQuery(this).css('font-size')) + (index === 0?1:-1)) + 'px';
                    jQuery(this).css('font-size',newSize);
                  });
                  if (count == 0 && parents.length == 1) {
                    // Maybe we just selected the actual element, so check it's parent
                    jQuery(parents[i].domobj).parent().each(function() { 
                      if (this.nodeName.toLowerCase() == 'span') {
                        count += 1;
  		        newSize = (parseInt(jQuery(this).css('font-size')) + (index === 0?1:-1)) + 'px';
                        jQuery(this).css('font-size',newSize);
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
                  console.log('replace partial');
                  replacechild(parents[i],index)
                }
              };

              // TODO - Figure out why the range selection is changing sometimes

              // Throws errors if we've added a tag in the middle, so skip it
              // instead of having it error
              if (! partialreplace)
                rangeObject.select();
              return false;
            }
          }));
        });
        function replacechild(item,index) {
          if (item.domobj.nodeType == 3) {
            var text = item.domobj.data.substr(item.startOffset, item.endOffset - item.startOffset);
            text = '<span class="aloha">' + text + '</span>';
            text = item.domobj.data.substr(0,item.startOffset) + text;
            text = text + item.domobj.data.substr(item.endOffset, item.domobj.data.length - item.endOffset);
            jQuery(item.domobj).replaceWith(text);
          }
          else if (item.domobj.tagName.toLowerCase() == 'span' && item.selection == "full") {
            var newSize = (parseInt(jQuery(item.domobj).css('font-size')) + (index === 0?1:-1)) + 'px';
            jQuery(item.domobj).css('font-size',newSize);
            jQuery(item.domobj).find('span').each(function () {
              newSize = (parseInt(jQuery(this).css('font-size')) + (index === 0?1:-1)) + 'px';
              jQuery(this).css('font-size',newSize);
            });
          }
          else {
            for (var j = 0; j < item.children.length; j++) {
              if (item.children[j].selection == "partial" || item.children[j].selection == "full")
                replacechild(item.children[j],index);
            };
          }
        }
  
        for (var i=0; i < names.length; i++) {
          FloatingMenu.addButton(
            "Aloha.continuoustext", 
            buttons[i], 
            i18nCore.t("floatingmenu.tab.format"), 
            1
          );
        }
      }
    });
});
