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

    $http
      .get("/api/albums")
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(albums => $http.get(`/api/albums/${albums[0].id}`))
      .then(res => res.data)
      .then(album => {
        album.imageUrl = `/api/albums/${album.id}/image`;
        $scope.album = album;
      })
      .catch($log.error);
  }
]);
