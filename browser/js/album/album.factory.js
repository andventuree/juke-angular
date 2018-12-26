juke.factory('AlbumFactory', function($http){ //we don't do the $log here
  const ENDPOINT = '/api/albums/';
  const getData = function (res) { return res.data; }

  function convertAlbum(album){ //extracted out to be modular
    album.imageUrl = '/api/albums/' + album.id + '/image';
    return album;
  }

  return {
    fetchAll: function(){
      return $http.get(ENDPOINT)
      .then(getData)
      .then(albums => { return albums.map(convertAlbum) });
    },
    fetchById: function(albums){
      return $http.get(ENDPOINT + albums[0].id)
      .then(getData)
      .then(convertAlbum)
      .then(album => {
        album.songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song.id + '/audio';
          song.albumIndex = i;
        });
        return album;
      })
    }
  }
})