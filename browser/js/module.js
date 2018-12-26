"use strict";

var juke = angular.module("juke", []);

//Remember: Factories are only called once
//This value is then cached so it can be reused over and over. Singleton pattern
juke.factory("StatsFactory", function($q) {
  var statsObj = {};
  statsObj.totalTime = function(album) {
    var audio = document.createElement("audio");
    //uses $q to construct a promise from scratch that library doesn't give you
    return $q(function(resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur() {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener("loadedmetadata", function() {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});
