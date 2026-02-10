const editions = {1: "volume_one.pdf", 2: "volume_two.pdf", 3: "volume_three.pdf"}
function viewPDF(edition){
    if(edition in editions)
        window.open("zines/" + editions[edition], "_blank");
    else
        alert("Invalid Zine Index");
}

// all audios
const audioIDs = ["WhipItAudio"]
// all audio playing statuses
var audioPlaying = {
    WhipItAudio: false
};
// when an audio is clicked
function toggleAudio(audioID){
    console.log("here")
    var audioPlayer = document.getElementById(audioID);
    // if audio is already playing, then pause it
    if(audioPlaying[audioID]){
        audioPlayer.pause();
        audioPlaying[audioID] = false;
    }
    else{ // if audio is not playing (yet), then pause all other audios and then play this one
        pauseAllAudios();
        audioPlayer.play();
        audioPlaying[audioID] = true;
    }
}
// pauses all audios
function pauseAllAudios(){
    var audioPlayer;
    for(const audioID of audioIDs){
        audioPlayer = document.getElementById(audioID);
        audioPlayer.pause();
    }
}