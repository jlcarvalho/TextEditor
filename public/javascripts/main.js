/**
 * Created by JeanLucas on 21/08/2015.
 */
'use strict';

(function(){
  var $editor = new TextEditor();
  var $save = document.querySelector('.btn-save');

  $save.addEventListener('click', function onclick () {
    $editor.save();
  });
}());
