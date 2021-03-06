/*
 * spa.js
 * Root namespace module
 */

/*jslint          browser : true,   continue : true,
  devel : true,   indent : true,    maxerr : 50,
  newcap : true,  nomem: true,      plusplus: true,
  regexp : true,  sloppy : true,    vars : false,
  white : true
 */
/* global $, spa */
var spa = (function () {
  var initModule = function ($container) {
    spa.shell.initModule($container);
  };

  return { initModule : initModule };
}());
