/* ########################################################### */
/* #################### RUBY MEGA MENU   ##################### */
/* ######################## V 1.0 ############################ */

/* ############## DEMO SHOWCASE JAVASCRIPT ################### */
/* THESE JS FOR DEMO SHOWCASE ONLY. ANY PROBLEM/QUESTION       */
/* REGARDING DEMO JS WILL NOT BE SUPPORTED.                    */

rubyMenuDemo = function()
{
  // Strict Mode
  "use strict";

  // Theme Switcher
  $( "#rubyTheme1" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-1.css') );
  });
  $( "#rubyTheme2" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-2.css') );
  });
  $( "#rubyTheme3" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-3.css') );
  });
  $( "#rubyTheme4" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-4.css') );
  });
  $( "#rubyTheme5" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-5.css') );
  });
  $( "#rubyTheme6" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-6.css') );
  });
  $( "#rubyTheme7" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-7.css') );
  });
  $( "#rubyTheme8" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-8.css') );
  });
  $( "#rubyTheme9" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-9.css') );
  });
  $( "#rubyTheme10" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-10.css') );
  });
  $( "#rubyTheme11" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-11.css') );
  });
  $( "#rubyTheme12" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-12.css') );
  });
  $( "#rubyTheme13" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-13.css') );
  });
  $( "#rubyTheme14" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-14.css') );
  });
  $( "#rubyTheme15" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-15.css') );
  });
  $( "#rubyTheme16" ).on('click', function() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/ruby-theme-16.css') );
  });
  $( "#cmn-toggle-1" ).on('click', function() {
    $("div.ruby-wrapper:not(.ruby-vertical)").toggleClass("ruby-menu-full-width");
  });
  $( "#cmn-toggle-2" ).on('click', function() {
    $("div.ruby-menu-demo-header").toggleClass("ruby-menu-demo-header-bg");
    $("div.ruby-wrapper").toggleClass("ruby-menu-transparent");
  });
  $( "#cmn-toggle-3" ).on('click', function() {
    var attr = $("#ruby-transitions").attr('disabled');
    if (typeof attr !== typeof undefined && attr !== false) {
      // Element has this attribute
      $("#ruby-transitions").removeAttr("disabled");
    } else {
      $("#ruby-transitions").attr("disabled", "disabled");
    }
  });
  $( "#cmn-toggle-4" ).on('click', function() {
    $("ul.ruby-menu").toggleClass("ruby-menu-dividers");
  });
}

rubyMenuDemo();
