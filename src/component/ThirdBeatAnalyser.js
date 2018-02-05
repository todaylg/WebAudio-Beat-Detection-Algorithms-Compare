import LoadBuffer from './LoadBuffer';
import AnalyserBeatDetector from '../lib/AnalyserBeatDetector';
import DrawPeaks from './DrawPeaks';

function ThirdBeatAnalyser(duration, musicSrc ,drawDOM) {
    let context = new AudioContext()

    let audioTag = document.querySelector('#audio');
    var analyser = context.createAnalyser();
    //analyser.connect(context.destination);//play
    LoadBuffer(context, musicSrc, function onload(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyser);
        source.start(0);
        context.suspend();
    })
    var beatDetector = new AnalyserBeatDetector(analyser, function () {
        let ratio = audioTag.currentTime / duration;
        DrawPeaks(drawDOM , ratio);
    });
    // loop and update
    let rafId;
    function beat() {
        beatDetector.update(1 / 60);
        rafId = requestAnimationFrame(beat);
    }
    beat();
    audioTag.addEventListener('ended', () => {
        window.cancelAnimationFrame(rafId);
    }, { once: true })
    return context;
}

export default ThirdBeatAnalyser;