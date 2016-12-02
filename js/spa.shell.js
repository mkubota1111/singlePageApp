/*
 * spa.shell.js
 * Shell module for SPA
 */
/*  jslint          browser : true,   continue : true,
    devel : true,   indent : 2,       maxerr : 50,
    newcap : true,  nomen : true,     plusplus : true,
    regexp : true,  sloppy : true,    vars : false,
    white : true
 */

 /*global $, spa */
 spa.shell = (function () {
   // ---- BEGIN MODULE SCOPE VARIABLES ---//
   var
     configMap = {
       main_html : String()
          + '<div class="spa-shell-head">'
            + '<div class="spa-shell-head-logo"></div>'
            + '<div class="spa-shell-head-acct"></div>'
            + '<div class="spa-shell-head-search"></div>'
          + '</div>'
          + '<div class="spa-shell-main">'
            + '<div class="spa-shell-main-nav"></div>'
            + '<div class="spa-shell-main-content"></div>'
          + '</div>'
          + '<div class="spa-shell-foot"></div>'
          + '<div class="spa-shell-chat"></div>'
          + '<div class="spa-shell-modal"></div>',
          chat_extend_time: 1000,
          chat_retract_time: 300,
          chat_extend_height: 450,
          chat_retract_height: 15
     },
     stateMap = { $container : null },
     jqueryMap = {},
     setJqueryMap, toggleChat, initModule;
     // ---- END MODULE SCOPE VARIABLES ---//
     // ---- BEGIN UTILITY METHODS ---//
     // ---- END UTILITY METHODS ---//
     // ---- BEGIN DOM METHODS ---//
     // Begin DOM Method /setJqueryMap/
     setJqueryMap = function () {
       var $container =   stateMap.$container;
       jqueryMap = {
         $container : $container,
         $chat: $container.find('.spa-shell-chat')
       };
     };
     // End Public Method /setJqueryMap/

     // Begin DOM method /toggleChat/
     // Purpose: Extends or retract chat slider
     // Arguments:
     //   * do_extend - if true, extends slider; if false retracts
     //   * callback = optional function to execute at end of animation
     // Settings:
     //   * chat_extend_time, chat_retract_time
     //   * chat_extend_height, chat_retract_height
     // Returns :boolean
     //   * true - slider animation activated
     //   * false - slider animation not activated
     //
     toggleChat = function (do_extend, callback) {
       var
        px_chat_ht = jqueryMap.$chat.height(),
        is_open = px_chat_ht === configMap.chat_extend_height,
        is_closed = px_chat_ht === configMap.chat_retract_height,
        is_sliding = !is_open && !is_closed;
       // avoid race condition
       if (is_sliding) {
        return false;
       }

       // Begin extend chat slider
       if (do_extend) {
         jqueryMap.$chat.animate (
           { height : configMap.chat_extend_height },
           configMap.chat_extend_time,
           function () {
             if (callback) {
               callback(jQueryMap.$chat);
             }
           }
         );
         return true;
       }
       // End retract chat slider

       // Begin retract chat slider
       jqueryMap.$chat.animate(
         { height : configMap.chat_retract_height },
         configMap.chat_retract_time,
         function () {
           if (callback) {
             callback(jqueryMap.$chat);
           }
         }
       );

       return true;
       // End retract chat slider
     };
     // End DOM method /toggleChat/
     // ---- END DOM METHODS ---//

     // ---- BEGIN PUBLIC METHODS ---//
     // Begin Public method /initModule/
     initModule = function ($container) {
       stateMap.$container = $container;
       $container.html(configMap.main_html);
       setJqueryMap();

       // test toggle
       setTimeout( function() {toggleChat(true);}, 3000);
       setTimeout( function() {toggleChat(false)}, 8000);
     };
     // End Public method /initModule/
     return {initModule : initModule};
     // ---- END PUBLIC METHODS ---//
 }());
