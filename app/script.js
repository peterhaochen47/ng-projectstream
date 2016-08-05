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
        var normal = false;
        var once = false;
        console.log("10 seconds after the like mark it will be:",(likemarks[indexCounter] + 10));

        setInterval(function(){
                        var currentTime = player.getCurrentTime();
                        if (!once && !normal && currentTime > likemarks[indexCounter]) {
                            console.log("at this time we are setting to normal: "+currentTime);
                            player.setPlaybackRate(1);
                            normal = true;

                        } else if (normal && currentTime > (likemarks[indexCounter] + 10)) {
                            console.log("at this time we are setting to X2: "+currentTime);
                            player.setPlaybackRate(2);
                            normal = false;
                            once = true;
                        }
                      },100);



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

//     setInterval(function(){
//        if (player.getCurrentTime() > 20) {
//         player.setPlaybackRate(1);
//       }
//     }, 500);


    });





});