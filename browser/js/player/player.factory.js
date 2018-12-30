'use strict';

//Remember there's no $scope in a factory. You'll need to inject into controller.

juke.factory('PlayerFactory', function($rootScope, $log){ 
  //$scope is a controller thing but $rootScope is available to everything so its okay to use
  //State - Factory is good at keeping state
  let playing = false;
  let currentSong = null;
  let list;
  let progress = 0;

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  const audio = document.createElement('audio');

  //Factory value
  const Player = {}
  Player.pause = function(){
    audio.pause();
    playing = false;
  }
  Player.start = function(song, songList){
    currentSong = song;
    list = songList;
    Player.pause();
    audio.src = song.audioUrl;
    audio.load();
    audio.play()
      .catch(err => { console.log('Error with audio promise. Probably skipping too fast', err)} );
    playing = true;
  }
  Player.isPlaying = function(){
    return playing;
  }
  Player.resume = function(){
    audio.play()
      .catch(err => { console.log('Error with audio promise. Probably skipping too fast', err)} );
    playing = true;
  }
  Player.getCurrentSong = function(){
    return currentSong; 
  }

  Player.toggle = function (song, album) {
    if (song !== Player.getCurrentSong()) {
      Player.start(song, album);
    } else if (Player.isPlaying()){
      Player.pause();
    } else {
      Player.resume();
    }
  };

  //Helpers
  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!currentSong || !list) return;
    var index = list.indexOf(currentSong);
    index = mod( (index + (interval || 1)), list.length );
    Player.start(list[index],list);
  }

  Player.next = function(){
    skip(1);
  }
  Player.previous = function(){
    skip(-1);
  }

  Player.getProgress = function(){
    //Presumably, whatever calls getProgress will run its own digest
    return progress;
  }

  audio.addEventListener('timeupdate', function () {
    progress = 100 * audio.currentTime / audio.duration;
    // Don't need to run digest, b/c ut can be handled in controller when getProgress is called
    // // $scope.$digest(); // re-computes current template only (this scope)
    // $scope.$evalAsync(); // likely best, schedules digest if none happening

    //Turns out, $evalAsync is needed but we don't have $scope in controller, 
    //Instead, we have $rootScope
    $rootScope.$evalAsync();

  });
  audio.addEventListener('ended', function () {
    Player.next();
    // Same as above reason
    // // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    // $scope.$evalAsync(); // likely best, schedules digest if none happening
    $rootScope.$evalAsync();
  });


  return Player;
});
