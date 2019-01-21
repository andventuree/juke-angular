'use strict'

// <h1 double-click>
juke.directive('doubleClick', function() {
  return {
    restrict: 'A', //this directive is an attr - see line 3 comment
    // templateUrl - don't need b/c this doesn't produce a visual view
    scope: {
      doubleClick: '&' //tl;dr - allows you to pass in an expression into directives
      //1) '&' tells ng to take the string from the attribute name
      //2) use this string as a key in parent scope 
      //3) and eval() it, 
      //can add things to scope or even call a fn b/c eval will treat like JS in parent scope
    },
    link: function(scope, element) { //need to bring in scope b/c arg order matters 
      element.on('dblclick', function() {
        scope.doubleClick();
      });
    }
  }
});

//Beware, using '&' like this is not typical. This is just an example to show you functionality.
//Generally $parse or $eval is used. Look up independently.