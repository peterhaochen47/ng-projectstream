
// book keeping variables
var likemarks = [];
var duration;
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

function loadVideo() {
    var id = document.getElementById("videoId").value;
    player.loadVideoById(id, 0, "large");
    duration = player.getDuration();
}

function initializeLikeMarks() {
    var totalSegmentCount = Math.floor(duration/10);
    for (i = 0; i < totalSegmentCount; i++) {
        likemarks.push(0);
    }
}

function onPlayerReady(event) {
    duration = player.getDuration();
    initializeLikeMarks();
}

function addOne() {
    var time = player.getCurrentTime();
    document.getElementById("marks").innerHTML = time;
    var segmentIndex = Math.floor(time/10);
    likemarks[segmentIndex] = likemarks[segmentIndex] + 1;
    document.getElementById("marksList").innerHTML = likemarks;
}

function playWithFlow() {

      document.getElementById("marks").innerHTML = '';
      var isSlowed = false;

      player.stopVideo();
      player.playVideo();

      setInterval(function() {
            var currentTime = player.getCurrentTime();
            var currentSegmentIndex = Math.floor(currentTime/10);
            var currentMarkNum = likemarks[currentSegmentIndex];

            if (currentMarkNum > 0 && !isSlowed) {
                console.log("---setting to x1 at: "+ currentTime);
                player.setPlaybackRate(1);
                isSlowed = true;
            } else if (currentMarkNum === 0 && isSlowed) {
                console.log("---setting to x2 at: "+ currentTime);
                player.setPlaybackRate(2);
                isSlowed = false;
            }
      }, 500);
}

$(window).load(function(){

    $(function() {

      embedYouTubeVideo();

    });
});