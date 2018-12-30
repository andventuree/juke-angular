'use strict'

juke.factory('ArtistFactory', function($http){
  const ENDPOINT = '/api/artists/';

  const getData = res => { return res.data; };

  return {
    fetchAll: function(){
      return $http.get(ENDPOINT)
      .then(getData);
    }
  }
})