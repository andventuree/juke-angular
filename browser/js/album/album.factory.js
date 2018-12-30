juke.factory('AlbumFactory', function($http, SongFactory){ //we don't do the $log here
  const ENDPOINT = '/api/albums/';
  const getData = function (res) { return res.data; }

  const convertAlbum = (album) => { //extracted out to be modular
    album.imageUrl = '/api/albums/' + album.id + '/image';
    return album;
  }

  return {
    fetchAll: function(){
      return $http.get(ENDPOINT)
      .then(getData)
      .then(albums => { return albums.map(convertAlbum) });
    },
    fetchById: function(albumId){
      return $http.get(ENDPOINT + albumId)
      .then(getData)
      .then(convertAlbum)
      .then(album => {
        album.songs = album.songs.map(SongFactory.convertSong);
        return album;
      })
    },
    convertAlbum: convertAlbum
  }
})