//= require jquery

$(function(){	
  var apiKey = '4e9a523523f384d5347fdcf9b3357395';
  $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=56825141@N00&per_page=8&format=json&jsoncallback=?',
  function(data){
  $.each(data.photos.photo, function(i,item){
    var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_s.jpg';
    var href = '<a href="https://www.flickr.com/photos/simonhn/'+item.id +'" title="'+item.title+'" >'
    var imgCont = href + '<img src="'+photoURL+'" width="75" height="75" alt="'+item.title+'" /></a>';
    $(imgCont).appendTo('#image-container');
  });
  });
});