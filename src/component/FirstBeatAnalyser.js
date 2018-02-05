import LoadBuffer from './LoadBuffer';
import GetPeaks from '../lib/GetPeaks';

function FirstBeatAnalyser(audioLength, musicSrc, drawDOM) {
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
        var peaks = GetPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);//双声道

        //"#svg"要暴露出去 todo
        drawPeaks(drawDOM, peaks, buffer.length);//???为什么不除以2 svg最多只能到百分之50
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

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'class', 'progress');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);

    svg.innerHTML = svg.innerHTML; // force repaint in some browsers
}

export default FirstBeatAnalyser;