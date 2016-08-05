var likemarks = [];
var time;

function addOne() {
 var time = player.getCurrentTime();
 document.getElementById("marks").innerHTML = time;
 likemarks.push(time);
 document.getElementById("marksList").innerHTML = likemarks;
}

function playWithFlow() {
  player.stopVideo();
  player.playVideo();

  if (marksList.length = 0) {
    alert("You don't have any marks");
  } else {
        var indexCounter = 0;

        // set the first time mark
        var currentMark = likemarks[indexCounter];
        var nextMark = likemarks[indexCounter + 1];
        var isSlowed = false;

        setInterval(function(){
                        var currentTime = player.getCurrentTime();

                        if (currentTime > nextMark) {
                            indexCounter = indexCounter + 1;
                            currentMark = likemarks[indexCounter]; // moves on to the next time mark
                            nextMark = likemarks[indexCounter + 1];
                        }

                        // setting to X1
                        if (currentTime > currentMark && !isSlowed) {
                            console.log("set to x1 at: "+currentTime);
                            player.setPlaybackRate(1);
                            isSlowed = true;

                           // setting to X2
                        } else if (currentTime > currentMark + 10 && isSlowed) {
                            console.log("set to x2 at: "+currentTime);
                            player.setPlaybackRate(2);
                            indexCounter = indexCounter + 1;
                            currentMark = likemarks[indexCounter]; // moves on to the next time mark
                            nextMark = likemarks[indexCounter + 1];
                            isSlowed = false;
                        }
                      },200);

    }

}

$(window).load(function(){

    function embedYouTubeVideo() {
      player = new YT.Player('video', {
        videoId: 'M7lc1UVf-VE',
        playerVars: {
          'autoplay': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
     event.target.setPlaybackRate(2);
    }

    $(function() {

      embedYouTubeVideo();


    });

});