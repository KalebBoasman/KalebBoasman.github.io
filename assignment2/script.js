var muted = false;

/*volume variable is used to store the volume level for a few functions
especially the mute function so it can return the previous level*/
var volume = 0.5;
//audioTrack variable designates which audio is currently selected
var audioTrack = 1;
//The repeatOn variable just tracks the state of the repeat button for use in the code.
var repeatOn = false;

/* I tried to only make new consts and variables for things that would get called often
but most of them got called often enough to save clutter by defining them here */
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");

const repeatBtn = document.querySelector('#repeat-btn')
const muteBtn = document.querySelector('#mute-btn');
const volumeUpBtn = document.querySelector("#volume-up-btn");
const volumeDownBtn = document.querySelector("#volume-down-btn");

const nextAudioBtn = document.querySelector('#next-audio-btn');
const previousAudioBtn = document.querySelector('#previous-audio-btn');

const forward30Btn = document.querySelector('#forward-30-btn');
const backward15Btn = document.querySelector('#backward-15-btn');

const audio1Btn = document.querySelector('#audio-1-btn');
const audio2Btn = document.querySelector('#audio-2-btn');
const audio3Btn = document.querySelector('#audio-3-btn');
const audio4Btn = document.querySelector('#audio-4-btn');

const audio = document.querySelector("#custom-audio-player");
const progressBar = document.querySelector("#progress-bar-fill");
const audioName = document.getElementById("current-audio-name");
const audio1 = document.getElementById("audio-1");
const audio2 = document.getElementById("audio-2");
const audio3 = document.getElementById("audio-3");
const audio4 = document.getElementById("audio-4");
const audioTimer = document.getElementById("audio-timer");
const volumeTracker = document.getElementById("volume-tracker");

audio.removeAttribute("controls");
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("timeupdate", audioFinishCheck);
audio.addEventListener("timeupdate", updateTimer);

//presets audio 1 to have the 'selected' colour and sets the tracks to have visual transitions.
audio1.style.backgroundColor = "#211e6b";
audio1.style.transition = '0.5s ease'
audio2.style.transition = '0.5s ease'
audio3.style.transition = '0.5s ease'
audio4.style.transition = '0.5s ease'


/*
removed the audio.ended condition to stop it from pausing at the end of audios
so that my audioFinishedCheck function would run properly
*/
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/nolan/64/1A6DFF/C822FF/pause.png";
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/nolan/64/1A6DFF/C822FF/play.png";
  }
}

/*
This function just toggles the repeatCheck variable that is used in other functions
to decided whether to repeat the same audio. It also handles the colour changing
for the button.
*/

function repeatCheck () {
   if (repeatOn == false){
      repeatOn = true;
      repeatBtn.style.backgroundColor = "#36329c";
   }
   else
   {
      repeatOn = false;
      repeatBtn.style.backgroundColor = "#191827";
   }
}

//function that checks if the audio is finished and moves it onto the next audio.
//Also checks if repeat is on to determine whether it moves up
function audioFinishCheck() {
   if (audio.ended) {
      if (repeatOn == false){
        if (audioTrack != 4){
           audioTrack = audioTrack+1;
           audioCheck();
        }
      
        else {
           audioTrack = 1;
           audioCheck();
        }
      }
      else {audioCheck();}
   }
}

/*
The functions below handle the 'next audio' and 'previous audio' buttons.
The 'next audio button' is straightforward and moves the 'audioTrack' variable up one
but the 'previous audio button' only jumps to the previous audio if hit
within the first 5 seconds of the current one. Otherwise it goes back to the start of the current audio.
This is a rather common and popular feature so I included it.
*/

function previousAudio() {
   if (audio.currentTime <= 5 && repeatOn == false)
      if (audioTrack != 1){
         audioTrack = audioTrack-1;
         audioCheck();
      }
      else {
         audioTrack = 4;
         audioCheck();
      }
   else{
      audio.currentTime = 0;
   }
}

function nextAudio() {
   if (repeatOn == false){
     if (audioTrack != 4){
        audioTrack = audioTrack+1;
        audioCheck();
     }
     else {
        audioTrack = 1;
        audioCheck();
     }
   }
   else {audioCheck()}
}


/*
Volume up and volume down functions operate much like the next audio
and previous audio functions but are tweaked for volume.

The entire function is nested inside an if loop that checks whether
the audio player is muted so the controls cant be used while its muted.

Every branch also runs the "updateVolumeTracker" function. This saves
resources since it only checks the volume level after its been changed
rather than being connected to timeupdate like other functions.
*/
function volumeUp(){
   if (muted == false){ 
     if (audio.volume <= 0.9){
    /*for some reason the volume variable was roughly adding 0.099999
    instead of 0.1 so i added rounding functions in to fix it */
     volume = Math.round((audio.volume + 0.1)*100)/100;
     audio.volume = volume;
     updateVolumeTracker();
     }
     else
     volume = 1;
     audio.volume = volume
     updateVolumeTracker();
   }
}
function volumeDown(){
   if (muted == false){
     if (audio.volume >= 0.1){
      volume = Math.round((audio.volume - 0.1)*100)/100;
     audio.volume = volume;
     updateVolumeTracker();
     }
     else
     volume = 0;
     audio.volume = volume
     updateVolumeTracker();
   }
}
//modified the togglePlayPause function for the mute function
function toggleMute() {
   if (muted == false) {
      muted = true;
     audio.volume = 0;
     muteBtn.style.backgroundColor = "#36329c";
     updateVolumeTracker();
   } else if (muted == true) {
      muted = false;
      audio.volume = volume;
     muteBtn.style.backgroundColor = "#191827";
     updateVolumeTracker();
   }
}

function updateVolumeTracker(){
   volumeTracker.textContent=("Volume:" + audio.volume * 100);
}

/*
Below is the audio check function that uses an if loop to check what the 'audioTrack' variable is set to then
updates the audio source based on the variable and restarts the audio. I likely could have made this easier had i utilised
the multiple sources you can add to an audio element but this has the same result without a loss in performance.
I also have it handle the colour changing to show what audio is currently selected as it was easiest to do it here
rather than make a new function.
*/

function audioCheck() {
   if (audioTrack == 1){
      audio.src = "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3";
   audio.play();
   audioName.textContent="Currently Playing: He's";
   audio1.style.backgroundColor = "#211e6b";
   audio2.style.backgroundColor = "#282631";
   audio3.style.backgroundColor = "#282631";
   audio4.style.backgroundColor = "#282631";
   }
   else if (audioTrack == 2) {
      audio.src = "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3";
   audio.play();
   audioName.textContent="Currently Playing: Dry Down feat. Ben Snaath";
   audio1.style.backgroundColor = "#282631";
   audio2.style.backgroundColor = "#211e6b";
   audio3.style.backgroundColor = "#282631";
   audio4.style.backgroundColor = "#282631";
   }
   else if (audioTrack == 3) {
      audio.src = "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3";
   audio.play();
   audioName.textContent="Currently Playing: Leapt";
   audio1.style.backgroundColor = "#282631";
   audio2.style.backgroundColor = "#282631";
   audio3.style.backgroundColor = "#211e6b";
   audio4.style.backgroundColor = "#282631";
   }
   else if (audioTrack == 4) {
      audio.src = "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3";
   audio.play();
   audioName.textContent="Currently Playing: Water Feature";
   audio1.style.backgroundColor = "#282631";
   audio2.style.backgroundColor = "#282631";
   audio3.style.backgroundColor = "#282631";
   audio4.style.backgroundColor = "#211e6b";
   
   }
   /*
   Since the controls can be used whether its paused or playing, but the function requires
   the use of audio.play(); to work, the play/pause button image must be manually set here
   to avoid a visual bug with the controls where it displays the wrong play/pause state. 
   */
   playPauseImg.src = "https://img.icons8.com/nolan/64/1A6DFF/C822FF/pause.png";
   }  


/*
These functions handle the audio select buttons by adjusting the 'audioTrack' variable
*/
function audioSelect1(){
   audioTrack = 1
   audioCheck();
}
function audioSelect2(){
   audioTrack = 2
   audioCheck();
}
function audioSelect3(){
   audioTrack = 3
   audioCheck();
}
function audioSelect4(){
   audioTrack = 4
   audioCheck();
}

/*
This function updates the time tracker underneath the progress bar.
It is also way too long for just replacing one text element because
i wanted to divide it into the proper (minutes:seconds) timestamp
*/
function updateTimer() {
   audioTimer.textContent = (Math.floor(audio.currentTime/ 60)+ ":" + 
   (Math.ceil(audio.currentTime)-(Math.floor(audio.currentTime/ 60)*60))
   + "-" + Math.floor(audio.duration / 60) + ":"  + 
   (Math.ceil(audio.duration)-(Math.floor(audio.duration/ 60)*60))); 
}

//Pre-existing progress bar updater
function updateProgressBar() {
   const value = (audio.currentTime / audio.duration) * 100;
   progressBar.style.width = value + "%";
 } 

/*
Below are the time skip forward and backward functions. 
There is a check to see if the timeskip will take it past the end/start of the video.
If this is the case it just sets the time to the end/start of the video
 */
function skipForward() {
 if (audio.currentTime + 30 < audio.duration) {
    const newTime = (audio.currentTime + 30);
    audio.currentTime = newTime
 }
 else {
    audio.currentTime = audio.duration;
 }
}

function skipBackward() {
   if (audio.currentTime - 15 > 0) {
      const newTime = (audio.currentTime - 15);
      audio.currentTime = newTime
   }
   else {
      audio.currentTime = 0;
   }
}
/*
This stack of event listeners creates a flicker when you press a button for a more
responsive feel to the buttons.
I'm certain there is a much faster way to handle this but it works.
*/
playPauseBtn.addEventListener('click', () => {
   playPauseBtn.style.backgroundColor = "#36329c"
   setTimeout(function() { playPauseBtn.style.backgroundColor = "#191827"; }, 100);
});
nextAudioBtn.addEventListener('click', () => {
   nextAudioBtn.style.backgroundColor = "#36329c"
   setTimeout(function() { nextAudioBtn.style.backgroundColor = "#191827"; }, 100);
});
previousAudioBtn.addEventListener('click', () => {
   previousAudioBtn.style.backgroundColor = "#36329c"
   setTimeout(function() { previousAudioBtn.style.backgroundColor = "#191827"; }, 100);
});
forward30Btn.addEventListener('click', () => {
   forward30Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { forward30Btn.style.backgroundColor = "#191827"; }, 100);
});
backward15Btn.addEventListener('click', () => {
   backward15Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { backward15Btn.style.backgroundColor = "#191827"; }, 100);
});
audio1Btn.addEventListener('click', () => {
   audio1Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { audio1Btn.style.backgroundColor = "#191827"; }, 100);
});
audio2Btn.addEventListener('click', () => {
   audio2Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { audio2Btn.style.backgroundColor = "#191827"; }, 100);
});
audio3Btn.addEventListener('click', () => {
   audio3Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { audio3Btn.style.backgroundColor = "#191827"; }, 100);
});
audio4Btn.addEventListener('click', () => {
   audio4Btn.style.backgroundColor = "#36329c"
   setTimeout(function() { audio4Btn.style.backgroundColor = "#191827"; }, 100);
});
volumeUpBtn.addEventListener('click', () => {
   if (muted == false){
      volumeUpBtn.style.backgroundColor = "#36329c"
      setTimeout(function() { volumeUpBtn.style.backgroundColor = "#191827"; }, 100);
   }
   else {
      volumeUpBtn.style.backgroundColor = "#17141b"
      setTimeout(function() { volumeUpBtn.style.backgroundColor = "#191827"; }, 100);
   }
});

/*these two buttons use an if loop to check whether muted is true so it can flash a different
 colour to show that the button wont work while its muted.*/
volumeDownBtn.addEventListener('click', () => {
   if (muted == false){
      volumeDownBtn.style.backgroundColor = "#36329c"
      setTimeout(function() { volumeDownBtn.style.backgroundColor = "#191827"; }, 100);
   }
   else {
      volumeDownBtn.style.backgroundColor = "#17141b"
      setTimeout(function() { volumeDownBtn.style.backgroundColor = "#191827"; }, 100);
   }

});