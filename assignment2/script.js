const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";

}

}
//Below are the time skip forward and backward functions. 
//There is a check to see if the timeskip will take it past the end of the video.
// If this is the case it just sets the time to the end of the video
function skipForward() {
 if (video.currentTime + 15 < video.duration) {
    const newTime = (video.currentTime + 15);
    video.currentTime = newTime
 }
 else {
    video.currentTime = video.duration;
 }
}

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
