var likemarks = [];
var duration;
var currentMark, nextMark;
var indexCounter = 0;
var isSlowed = false;
// var time;

function addOne() {
 var time = player.getCurrentTime();
 document.getElementById("marks").innerHTML = time;
 likemarks.push(time);
 document.getElementById("marksList").innerHTML = likemarks;
}

function playWithFlow() {

  // sorting the new mark list
  likemarks.sort(function(a, b){return a - b});

  // resetting the displayed marks
  document.getElementById("marks").innerHTML = '';

  player.stopVideo();
  player.playVideo();
  player.setPlaybackRate(2);

  if (likemarks.length === 0) {
    alert("You don't have any marks");
  } else {

        // resetting all the variables
        indexCounter = 0;
        isSlowed = false;
        currentMark = likemarks[indexCounter];
        nextMark = likemarks[indexCounter + 1];
        if (!nextMark) {nextMark = duration;}


        setInterval(function(){
                   var currentTime = player.getCurrentTime();

                   if (currentTime > nextMark) {
                       indexCounter = indexCounter + 1;
                       currentMark = likemarks[indexCounter]; // moves on to the next time mark
                       if (!currentMark) {currentMark = duration;}
                       nextMark = likemarks[indexCounter + 1];
                       if (!nextMark) {nextMark = duration;}
                   }

                   // setting to X1
                   if (currentTime > currentMark && !isSlowed) {
                       console.log("set to x1 at: "+currentTime + 'and current mark =' + currentMark);
                       player.setPlaybackRate(1);
                       isSlowed = true;

                      // setting to X2
                   } else if (currentTime > currentMark + 10 && isSlowed) {
                       console.log("set to x2 at: "+currentTime + 'and current mark =' + currentMark);
                       player.setPlaybackRate(2);
                       indexCounter = indexCounter + 1;
                       currentMark = likemarks[indexCounter]; // moves on to the next time mark
                       if (!currentMark) {currentMark = duration;}
                       nextMark = likemarks[indexCounter + 1];
                       if (!nextMark) {nextMark = duration;}
                       isSlowed = false;
                   }

            },200);
    }
}

$(window).load(function(){

    function embedYouTubeVideo() {
      player = new YT.Player('video', {
        videoId: 'PfPdYYsEfAE',
        playerVars: {
          'autoplay': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
         duration = player.getDuration();
    }

    $(function() {

      embedYouTubeVideo();

    });
});