import LoadBuffer from '../lib/LoadBuffer';
import BeatDetektor from '../lib/beatdetektor';
import getPeaks from '../lib/thoughtMusic';
import AnalyserBeatDetector from '../lib/analyserBeatDetector';
import stasilo from '../lib/beatdetector_stasilo';

function Init() {
    let musicSrc = '/dist/audio/test.mp3';

    let audioTag = document.querySelector('#audio'),
        playButton = document.querySelector('#play');

    audioTag.src = musicSrc;

    audioTag.oncanplaythrough = () => {
        let duration = audioTag.duration;
        //Event Init
        let updateProgressState = () => {
            if (audioTag.paused) {
                return;
            }
            var progressIndicator = document.querySelector('#progress');
            if (progressIndicator && duration) {
                if (audioTag.currentTime >= duration) audioTag.currentTime = 0;//只显示audioLengt那么长
                progressIndicator.setAttribute('x', (audioTag.currentTime * 100 / duration) + '%');
            }
            requestAnimationFrame(updateProgressState);
        }

        audioTag.addEventListener('play', updateProgressState);
        audioTag.addEventListener('playing', updateProgressState);

        let updatePlayLabel = () => {
            playButton.innerHTML = audioTag.paused ? 'Play track' : 'Pause track';
        }

        audioTag.addEventListener('play', updatePlayLabel);
        audioTag.addEventListener('playing', updatePlayLabel);
        audioTag.addEventListener('pause', updatePlayLabel);
        audioTag.addEventListener('ended', updatePlayLabel);

        playButton.addEventListener('click', () => {
            if (audioTag.paused) {
                audioTag.play();
            } else {
                audioTag.pause();
            }
        });
        //Begin Analyser
        BeatAnalyser(duration, musicSrc);

        BeatAnalyser1(duration, musicSrc);

        BeatAnalyser2(duration, musicSrc);

        BeatAnalyser3(duration, musicSrc);
    }
}


function BeatAnalyser(audioLength, musicSrc) {
    var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    var context = new OfflineContext(2, audioLength * 44100, 44100);//numOfChannels,length,sampleRate
    //let context = new AudioContext();

    // load a sound and play it immediatly
    LoadBuffer(context, musicSrc, function onload(buffer) {
        let destination = context.destination;

        var source = context.createBufferSource();
        source.buffer = buffer;

        //低通滤波器先走一波
        var lowpass = context.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 150;//高于150的直接pass
        lowpass.Q.value = 1;

        source.connect(lowpass);

        var highpass = context.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 100;//低于100的直接pass
        highpass.Q.value = 1;//Quality

        lowpass.connect(highpass);

        highpass.connect(destination);

        source.start(0);
        context.startRendering();

    }, function oncomplete(buffer) {
        //This AudioNode will do the amplitude modulation effect directly in JavaScript
        var peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);//双声道

        drawPeaks('#svg', peaks, buffer.length);//???为什么不除以2 svg最多只能到百分之50

        var svgNS = 'http://www.w3.org/2000/svg';
        var rect;

        rect = document.createElementNS(svgNS, 'rect');
        rect.setAttributeNS(null, 'id', 'progress');
        rect.setAttributeNS(null, 'y', 0);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttributeNS(null, 'height', '100%');
        svg.appendChild(rect);

        svg.innerHTML = svg.innerHTML; // force repaint in some browsers
    });
}

function drawPeaks(domID, peaks, bufferLength) {
    var svg = document.querySelector(domID);
    svg.innerHTML = '';
    var svgNS = 'http://www.w3.org/2000/svg';
    var rect;
    peaks.forEach(function (peak) {//将peaks信息进行绘制
        rect = document.createElementNS(svgNS, 'rect');
        rect.setAttributeNS(null, 'x', (peak.position / bufferLength) * 100 + '%');
        rect.setAttributeNS(null, 'y', 0);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttributeNS(null, 'height', '100%');
        svg.appendChild(rect);
    });
}

function BeatAnalyser1(duration, musicSrc) {
    let context = new AudioContext()

    let beatDetektor = new BeatDetektor();
    let vu = new BeatDetektor.modules.vis.VU();
    let bassKick = new BeatDetektor.modules.vis.BassKick();

    // load a sound and play it immediatly
    LoadBuffer(context, musicSrc, function onload(buffer) {
        var destination = context.destination;

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
                let ratio = context.currentTime / duration;
                drawPeaks1("#svg1", ratio);
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
    });
}

function drawPeaks1(domID, ratio) {
    var svg = document.querySelector(domID);
    var svgNS = 'http://www.w3.org/2000/svg';
    var rect;

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'x', ratio * 100 + '%');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);
}


function BeatAnalyser2(duration, musicSrc) {
    let context = new AudioContext()

    var analyser = context.createAnalyser();
    //analyser.connect(context.destination);//play
    LoadBuffer(context, musicSrc, function onload(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(analyser);
        document.querySelector('#audio').play();
        source.start(0);
    })
    var beatDetector = new AnalyserBeatDetector(analyser, function () {
        let ratio = context.currentTime / duration;
        drawPeaks2('#svg2', ratio);
    });
    // loop and update
    setInterval(function () {
        beatDetector.update(1 / 60)
    }, 1000 / 60);
}

function drawPeaks2(domID, ratio) {
    var svg = document.querySelector(domID);
    var svgNS = 'http://www.w3.org/2000/svg';
    var rect;

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'x', ratio * 100 + '%');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);
}

function BeatAnalyser3(duration, musicSrc) {
    let song = new stasilo.BeatDetector({ url: musicSrc });
    // loop and update
    let audioTag = document.querySelector('#audio');
    setInterval(function () {
        if (song.isOnBeat()) {
            let ratio = audioTag.currentTime / duration;
            drawPeaks3('#svg3', ratio);
        }
    }, 1000 / 60);
}

function drawPeaks3(domID, ratio) {
    var svg = document.querySelector(domID);
    var svgNS = 'http://www.w3.org/2000/svg';
    var rect;

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'x', ratio * 100 + '%');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);
}
window.onload = () => {
    Init();
};


