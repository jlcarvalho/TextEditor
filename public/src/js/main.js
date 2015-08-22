/**
 * Created by JeanLucas on 21/08/2015.
 */

/* jshint browser: true */
/*globals TextEditor*/

(function(){
  "use strict";

  var $editor = new TextEditor();
  var $save = document.querySelector('.btn-save');

  $save.addEventListener('click', function onclick () {
    $editor.save();
  });
}());
