
// book keeping variables
var likemarks = [];
var duration;
var currentMark, nextMark;
var indexCounter = 0;
var isSlowed = false;

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

function addOne() {
 var time = player.getCurrentTime();
 document.getElementById("marks").innerHTML = time;
 likemarks.push(time);
 document.getElementById("marksList").innerHTML = likemarks;
}

function moveOnToNextMark() {
    indexCounter = indexCounter + 1;
    currentMark = likemarks[indexCounter]; // moves on to the next time mark
    if (!currentMark) {currentMark = duration;}
    nextMark = likemarks[indexCounter + 1];
    if (!nextMark) {nextMark = duration;}
}

function playWithFlow() {

  // sorting the new mark list
  likemarks.sort(function(a, b){return a - b});

  // resetting the displayed mark list
  document.getElementById("marks").innerHTML = '';

  player.stopVideo();
  player.playVideo();
  player.setPlaybackRate(2);

  if (likemarks.length === 0) {
    alert("You don't have any marks yet!");
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
                       moveOnToNextMark()
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
                       moveOnToNextMark()
                       isSlowed = false;
                   }

            },200);
    }
}

function loadVideo() {
    var id = document.getElementById("videoId").value;
    player.loadVideoById(id, 0, "large");
    duration = player.getDuration();
}

$(window).load(function(){

    $(function() {

      embedYouTubeVideo();

    });
});