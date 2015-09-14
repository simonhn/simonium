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

  var cache = [];
  // Arguments are image paths relative to the current page.

  $.preLoadImages = function() {
    var args_len = arguments.length;
    sliderDiv = $(document.createElement('div'));
    sliderMain = $(document.createElement('div'));
    sliderMain.addClass('photoslider_main');
    sliderMainImg = document.createElement('img');
    sliderMainImg.src = arguments[0];
    sliderMainImg.title = 1;
    sliderMain.append(sliderMainImg);
    sliderDiv.append(sliderMain);
    sliderNav = $(document.createElement('div'));
    sliderNav.addClass('photoslider_nav');
    sliderDiv.append(sliderNav);
    sliderTitle = $(document.createElement('div'));
    sliderTitle.addClass('photoslider_title');
    sliderDiv.append(sliderTitle);

    $('.photoContainer').append(sliderDiv);
    for (var i = 0; i < args_len; i++) {
      var div = $(document.createElement('div'));
      div.attr('imageurl',arguments[i]);
      div.attr('title',i+1);
      div.addClass('photoslider_thumb');
    
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i].replace("originals", "thumbs");
      cacheImage.title = i+1;
      cacheImage.alt = arguments[i].slice(arguments[i].indexOf("-")+1,(arguments[i].length)-4);
      (new Image()).src = arguments[i];
      cache.push(cacheImage);	
      div.append(cacheImage);
      $('.photoslider_nav').append(div);
    }

    //we need to add a clear since we have floating divs
    var clear = document.createElement('div');
    $(clear).addClass('photoslider_clear');
    $(sliderNav).append(clear);
    //setInterval( "movePhoto(1)", 180 );
  }
  if (top.location.pathname.indexOf("/photo") === 0)
  {

    $.preLoadImages(
      "/images/princess/originals/1-September 02, 2009.jpg",
      "/images/princess/originals/2-September 03, 2009.jpg",
      "/images/princess/originals/3-September 07, 2009.jpg",
      "/images/princess/originals/4-September 08, 2009.jpg",
      "/images/princess/originals/5-September 09, 2009.jpg",
      "/images/princess/originals/6-September 10, 2009.jpg",
      "/images/princess/originals/7-September 14, 2009.jpg",
      "/images/princess/originals/8-September 15, 2009.jpg",
      "/images/princess/originals/9-September 16, 2009.jpg",
      "/images/princess/originals/10-September 21, 2009.jpg",
      "/images/princess/originals/11-September 22, 2009.jpg",
      "/images/princess/originals/12-September 23, 2009.jpg",
      "/images/princess/originals/13-September 24, 2009.jpg",
      "/images/princess/originals/14-September 29, 2009.jpg",
      "/images/princess/originals/15-October 01, 2009.jpg",
      "/images/princess/originals/16-October 26, 2009.jpg",
      "/images/princess/originals/17-October 27, 2009.jpg",
      "/images/princess/originals/18-October 28, 2009.jpg",
      "/images/princess/originals/19-October 29, 2009.jpg",
      "/images/princess/originals/20-November 02, 2009.jpg",
      "/images/princess/originals/21-November 04, 2009.jpg",
      "/images/princess/originals/22-November 05, 2009.jpg",
      "/images/princess/originals/23-November 09, 2009.jpg",
      "/images/princess/originals/24-November 10, 2009.jpg",
      "/images/princess/originals/25-November 11, 2009.jpg",
      "/images/princess/originals/26-November 12, 2009.jpg",
      "/images/princess/originals/27-November 25, 2009.jpg",
      "/images/princess/originals/28-November 26, 2009.jpg",
      "/images/princess/originals/29-November 27, 2009.jpg",
      "/images/princess/originals/30-November 30, 2009.jpg",
      "/images/princess/originals/31-December 01, 2009.jpg",
      "/images/princess/originals/32-December 03, 2009.jpg",
      "/images/princess/originals/33-December 07, 2009.jpg",
      "/images/princess/originals/34-December 08, 2009.jpg",
      "/images/princess/originals/35-December 09, 2009.jpg",
      "/images/princess/originals/36-December 10, 2009.jpg",
      "/images/princess/originals/37-December 14, 2009.jpg",
      "/images/princess/originals/38-December 15, 2009.jpg",
      "/images/princess/originals/39-December 16, 2009.jpg",
      "/images/princess/originals/40-December 17, 2009.jpg",
      "/images/princess/originals/41-December 21, 2009.jpg"
    );

    //click on image
    $('.photoslider_thumb').each(function(){
      $(this).click(function(ev){
        if(ev.currentTarget){
          thumb = $(ev.currentTarget);
          $('.photoslider_main img').attr({src:thumb.attr('imageurl'),title:thumb.attr('title')});
          $('.photoslider_title').text(thumb.attr('imageurl').slice(thumb.attr('imageurl').indexOf("-")+1,(thumb.attr('imageurl').length)-4));

        }

      });

    });
}
  
  $(document).keydown(function(e) {
    var key = e.keyCode || e.which;
    //left
    if (key == 37) { 
      movePhoto(-1);
      return false;
    }
    //right
    else if(key == 39) { 
      movePhoto(1);
      return false;
    }
  });

  $(".photoslider_thumb img").hover(function(e){
    xOffset = 100;
    yOffset = 35;
    $('.photoContainer').append("<div class=\"previewContainer\"><p id='preview'><img src='"+ this.src +"'/><br/>"+this.alt+"</p><\div>");								 
  $("#preview").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX - yOffset) + "px").css( "position", "absolute" ).fadeIn("fast");},

  function(){
    $("#preview").remove();
    $('.previewContainer').remove();
  });
});


function movePhoto(direction){
  //hvilket photo er current?
  var currentId = $('.photoslider_main img').attr('title');

  //move to next photo
  var nextPos = parseInt(currentId) + direction;
  if (nextPos > 0 && nextPos < 42){
    var newSrc = $('.photoslider_thumb[title='+nextPos+']').attr('imageurl');
    $('.photoslider_main img').attr({src:newSrc,title:nextPos});
    $('.photoslider_title').text(newSrc.slice(newSrc.indexOf("-")+1,(newSrc.length)-4));
  }
}