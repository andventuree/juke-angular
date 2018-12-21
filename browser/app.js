angular.module("juke", []).controller("mainController", [
  "$scope",
  "$http",
  "$log",
  function($scope, $http, $log) {
    var fakeAlbum = {
      name: "Abbey Road",
      imageUrl: "http://fillmurray.com/300/300",
      songs: [
        {
          name: "Romeo & Juliette",
          artists: [{ name: "Bill" }],
          genre: "Funk",
          audioUrl:
            "https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3"
        },
        {
          name: "White Rabbit",
          artists: [{ name: "Bill" }, { name: "Bob" }],
          genre: "Fantasy",
          audioUrl:
            "https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3"
        },
        {
          name: "Lucy in the Sky with Diamonds",
          artists: [{ name: "Bob" }],
          genre: "Space",
          audioUrl:
            "https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3"
        }
      ]
    };

    $scope.album = fakeAlbum;

    $scope.getNames = function(artists) {
      return artists.map(function(artist) {
        return artist.name;
      });
    };

    const albumsFromAPI = $http.get("/api/albums");

    albumsFromAPI
      .then(response => {
        console.log("response from $http.get call to api/albums", response);
      })
      .catch($log.log);
  }
]);
