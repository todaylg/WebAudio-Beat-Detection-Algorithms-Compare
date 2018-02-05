import LoadBuffer from './LoadBuffer';
import stasilo from '../lib/Beatdetector_stasilo';
import DrawPeaks from './DrawPeaks';

function FourthBeatAnalyser(duration, musicSrc ,drawDOM) {
    let song = new stasilo.BeatDetector({ url: musicSrc });
    
    // loop and update
    let audioTag = document.querySelector('#audio');
    
    function beat() {
        if (song.isOnBeat()) {
            let ratio = audioTag.currentTime / duration;
            DrawPeaks(drawDOM , ratio);
        }
        requestAnimationFrame(beat);
    }
    beat();
    return song.context;
}

export default FourthBeatAnalyser;