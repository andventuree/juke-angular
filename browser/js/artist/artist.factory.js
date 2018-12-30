'use strict'

juke.factory('ArtistFactory', function($http, $q, AlbumFactory, SongFactory){
  const ENDPOINT = '/api/artists/';
  const getData = res => { return res.data; };

  return {
    fetchAll: function(){
      return $http.get(ENDPOINT)
      .then(getData);
    },
    fetchById: function(artistId){
      //given artistId, our RESTful endpoints let us fetch all the data we need
      return $q.all([ //combine several promises to make them at the same time
        $http.get(ENDPOINT + artistId).then(getData),
        $http.get(ENDPOINT + artistId + '/albums').then(getData),
        $http.get(ENDPOINT + artistId + '/songs').then(getData)
      ])
      .then(([artist, albums, songs]) => { //destructuring arr
        artist.songs = songs.map(SongFactory.convertSong);
        artist.albums = albums.map(AlbumFactory.convertAlbum);
        return artist; //load all this data onto controller
      });
    }
  }
})