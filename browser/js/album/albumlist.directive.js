"use strict";

// <album-List> //html won't throw error at you if you name it wrong
juke.directive("albumList", function() {
  return {
    restrict: "E",
    templateUrl: "/js/album/templates/album-list.html",
    scope: { //isolate scope
      albums: '=', //<album-list albums='valueFrom$scope'>
    }
  };
});
