"use strict";

// This module exports a script function to apply a
// box-shadow to the tweet and change colours of icons
//

$(document).ready(function() {

  $("article").hover(
      function() {
        $( this ).css( {   'box-shadow': '10px 5px #C5CBE3' } );
      }, function() {
        $( this ).css( {   'box-shadow': 'none' } );
      }
  );

  $("i").hover(
    function() {
      $( this ).css( {   'color': '#C6A14F' } );
    }, function() {
      $( this ).css( {   'color': '#4054a1' } );
    }
);

});