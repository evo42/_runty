define(
[ 'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'aloha/floatingmenu',
        'undo/vendor/undo',
	'i18n!undoredo/nls/i18n',
	'i18n!aloha/nls/i18n',
        'css!undoredo/css/undoredo.css'],
function (Aloha, jQuery, Plugin, FloatingMenu,i18n, i18nCore){
    "use strict";
 
    return Plugin.create( 'undoredo', {
      languages: ['en'],
      init: function() {
        if (!Aloha.settings.plugins.undoredo) {
          Aloha.settings.plugins.undoredo = {}
        }
        var undoButton = new Aloha.ui.Button({
          'name': 'undo',
          'iconClass' : 'GENTICS_button_undo',
          'size': 'small',
          'onclick' : function(element, event) { 
            var e = jQuery.Event("keydown");
            e.metaKey = true;
            e.ctrlKey = true;
            e.shiftKey = false;
            e.keyCode = 90;
            e.which = 90;
            Aloha.activeEditable.obj.trigger(e);
            FloatingMenu.setScope('Aloha.continuoustext'); 
          },
          'tooltip': 'Undo',
          'toggle': false
        });
        FloatingMenu.addButton(
          'Aloha.continuoustext',
          undoButton,
          i18nCore.t('floatingmenu.tab.format'),
          1
        );
        var redoButton = new Aloha.ui.Button({
          'name': 'redo',
          'iconClass' : 'GENTICS_button_redo',
          'size': 'small',
          'onclick' : function(element, event) { 
            var e = jQuery.Event("keydown");
            e.metaKey = true;
            e.ctrlKey = true;
            e.shiftKey = true;
            e.keyCode = 90;
            e.which = 90;
            Aloha.activeEditable.obj.trigger(e);
            FloatingMenu.setScope('Aloha.continuoustext'); 
          },
          'tooltip': 'Redo',
          'toggle': false
        });
        FloatingMenu.addButton(
          'Aloha.continuoustext',
          redoButton,
          i18nCore.t('floatingmenu.tab.format'),
          1
        );
      }
    });
});
