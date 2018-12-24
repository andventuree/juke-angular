angular.module("juke", ["main"]);

angular.module("main", []).controller("main", [
  "$scope",
  "$http",
  "$log",
  function($scope, $http, $log) {
    $scope.getNames = function(artists) {
      return artists.map(artist => {
        return artist.name;
      });
    };

    const getData = res => res.data;

    $http
      .get("/api/albums")
      .then(getData) //To keep DRY
      .then(albums => $http.get(`/api/albums/${albums[0].id}`))
      .then(getData)
      .then(album => {
        album.imageUrl = `/api/albums/${album.id}/image`;
        album.songs.forEach((song, i) => {
          song.albumIdx = i;
          song.audioUrl = `/api/songs/${song.id}/audio`;
        });
        $scope.album = album;
      })
      .catch($log.error);
    //Everything $http.get is fired, angular knows to run another $digest cycle
    //which means, ng will go back to view template (HTML) and will re-interpolate data
    //fills in all the expressions

    var audio = document.createElement("audio");

    $scope.toggle = function(song) {
      if ($scope.playing && $scope.currentSong === song) pause();
      else play(song);
    };

    //Refactor: Don't crowd $scope namespace if possible
    function play(song) {
      $scope.playing = true;
      $scope.currentSong = song;
      audio.src = song.audioUrl;
      audio.load();
      audio
        .play()
        // .then(() => console.log(`${song.name} at API route ${song.audioUrl}`))
        .catch(err => $log.error);
    }

    function pause() {
      $scope.playing = false;
      audio.pause();
    }

    $scope.shouldShowPlay = function(song) {
      return song !== $scope.currentSong || !$scope.playing; //bool to toggle view
    };

    $scope.shouldShowPause = function(song) {
      return song === $scope.currentSong && $scope.playing;
    };

    $scope.previous = function() {
      // play($scope.album.songs[$scope.currentSong.albumIdx - 1]);
      skip(-1);
    };

    $scope.next = function() {
      // play($scope.album.songs[$scope.currentSong.albumIdx + 1]);
      skip(1);
    };

    //Helper fn to fix js modulo
    //To create inclusive range endpoints
    function mod(num, m) {
      return ((num % m) + m) % m;
    }

    function skip(interval) {
      if (!$scope.currentSong) return;
      let index = $scope.currentSong.albumIdx;
      index = mod(index + interval, $scope.album.songs.length);
      $scope.currentSong = $scope.album.songs[index];
      if ($scope.playing) play($scope.currentSong);
      else pause();
    }
  }
]);
