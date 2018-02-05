import LoadBuffer from './LoadBuffer';
import BeatDetektor from '../lib/Beatdetektor';
import DrawPeaks from './DrawPeaks';

function SecondBeatAnalyser(duration, musicSrc ,drawDOM) {
    let context = new AudioContext()

    let beatDetektor = new BeatDetektor();
    let vu = new BeatDetektor.modules.vis.VU();
    let bassKick = new BeatDetektor.modules.vis.BassKick();

    // load a sound
    LoadBuffer(context, musicSrc, function onload(buffer) {
        var destination = context.destination;
        let audioTag = document.querySelector('#audio');
        var source = context.createBufferSource();
        source.buffer = buffer;
        //source.loop = true
        // This AudioNode will do the amplitude modulation effect directly in JavaScript
        var jsProcessor = context.createScriptProcessor(2048);
        var ftimer = 0;
        source.connect(jsProcessor);
        jsProcessor.connect(destination);
        //source.connect(destination);//play

        //这个beatDetector是按帧处理的
        jsProcessor.onaudioprocess = function (event) {
            // Get left channel input. No need for output arrays. They're hooked up
            // directly to the destination, and we're not doing any processing.
            var inputArrayL = event.inputBuffer.getChannelData(0);
            // for beatDetektor.js
            beatDetektor.process(context.currentTime, inputArrayL);
            // for basskick
            bassKick.process(beatDetektor);
            if (bassKick.is_kick) {
                let ratio = audioTag.currentTime / duration;
                DrawPeaks(drawDOM, ratio);
            }

            //document.body.style.background = bassKick.is_kick ? '#222' : 'white'
            // for the vumeter
            ftimer += beatDetektor.last_update;
            if (ftimer > 1.0 / 24.0) {
                vu.process(beatDetektor, ftimer);
                ftimer = 0;
            }
        };
        source.start(0);
        context.suspend();
    });
    return context;
}

export default SecondBeatAnalyser;