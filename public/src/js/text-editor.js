/**
 * Created by JeanLucas on 22/08/2015.
 */

/* jshint browser: true */
(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.TextEditor = factory();
  }
}(this, function() {
  "use strict";
  function TextEditor(selector, opts) {
    opts = opts || {};

    var editor = {};
    var $node = document.querySelector(selector || '.editor');

    var ActionsEnum = {
      BOLD: 66,
      ITALIC: 73,
      SAVE: 83,
      UNDERLINE: 85
    };

    editor.save = function () {
      localStorage.setItem('editor', $node.innerHTML);
    };

    editor.bold = function () {
      document.execCommand('Bold', false, null);
    };

    editor.italic = function () {
      document.execCommand('Italic', false, null);
    };

    editor.underline = function () {
      document.execCommand('Underline', false, null);
    };

    document.addEventListener('DOMContentLoaded', function onload (){
      var saved = localStorage.getItem('editor');
      if (saved) {
        $node.innerHTML = saved;
      }

      $node.setAttribute('aria-label', (opts.text || 'Insira o texto aqui.'));
    });

    document.addEventListener('keypress', function onkeydown (e){
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey
      if (e.ctrlKey || e.metaKey) {
        switch (e.keyCode)  {
          case ActionsEnum.BOLD:
            disableDefault(e);
            editor.bold();
            break;
          case ActionsEnum.ITALIC:
            disableDefault(e);
            editor.italic();
            break;
          case ActionsEnum.UNDERLINE:
            disableDefault(e);
            editor.underline();
            break;
          case ActionsEnum.SAVE:
            disableDefault(e);
            editor.save();
            break;
        }
      }
    });

    function disableDefault (e) {
      // FF
      if (e.preventDefault) {
        e.preventDefault();
      }

      // MSIE
      else {
        e.returnValue = false;
        e.keyCode = 0;
      }

      return;
    }

    return editor;
  }

  return TextEditor;
}));
