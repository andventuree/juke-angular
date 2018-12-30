'use strict'

juke.factory('SongFactory', function(){
  return {
    convertSong: function(song) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      return song;
    }
  }
})