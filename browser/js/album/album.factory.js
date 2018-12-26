juke.factory('AlbumFactory', function($http, $log){
  const ENDPOINT = '/api/albums/';
  const getData = function (res) { return res.data; }

  return {
    fetchAll: function(){
      return $http.get(ENDPOINT)
      .then(getData)
    },
    fetchById: function(albums){
      return $http.get(ENDPOINT + albums[0].id)
      .then(getData)
      .then(album => {
        album.imageUrl = '/api/albums/' + album.id + '/image';
        album.songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song.id + '/audio';
          song.albumIndex = i;
        });
        return album;
      })
    }
  }
})