require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({8:[function(require,module,exports) {
"use strict";function e(e,n,o,t,u){let f;o=o||function(e){},u=u||function(){},n instanceof Blob?f=new FileReader:((f=new XMLHttpRequest).open("GET",n,!0),f.responseType="arraybuffer"),f.onload=function(){e.decodeAudioData(f.response,function(e){o(e)},function(){u()}),t&&(e.oncomplete=function(e){let n=e.renderedBuffer;t(n)})},f.send()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],9:[function(require,module,exports) {
"use strict";function t(t){for(var e=t[0].length/22050,o=[],r=0;r<e;r++){for(var n=0,u=22050*r;u<22050*(r+1);u++){var s=Math.max(Math.abs(t[0][u]),Math.abs(t[1][u]));(!n||s>n.volume)&&(n={position:u,volume:s})}o.push(n)}return o.sort(function(t,e){return e.volume-t.volume}),(o=o.splice(0,.5*o.length)).sort(function(t,e){return t.position-e.position}),o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./LoadBuffer"),t=u(e),n=require("../lib/GetPeaks"),r=u(n);function u(e){return e&&e.__esModule?e:{default:e}}function i(e,n,u){var i=new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(2,44100*e,44100);(0,t.default)(i,n,function(e){let t=i.destination;var n=i.createBufferSource();n.buffer=e;var r=i.createBiquadFilter();r.type="lowpass",r.frequency.value=150,r.Q.value=1,n.connect(r);var u=i.createBiquadFilter();u.type="highpass",u.frequency.value=100,u.Q.value=1,r.connect(u),u.connect(t),n.start(0),i.startRendering()},function(e){var t=(0,r.default)([e.getChannelData(0),e.getChannelData(1)]);l(u,t,e.length)})}function l(e,t,n){var r=document.querySelector(e);r.innerHTML="";var u,i="http://www.w3.org/2000/svg";t.forEach(function(e){(u=document.createElementNS(i,"rect")).setAttributeNS(null,"x",e.position/n*100+"%"),u.setAttributeNS(null,"y",0),u.setAttributeNS(null,"width",1),u.setAttributeNS(null,"height","100%"),r.appendChild(u)}),(u=document.createElementNS(i,"rect")).setAttributeNS(null,"class","progress"),u.setAttributeNS(null,"y",0),u.setAttributeNS(null,"width",1),u.setAttributeNS(null,"height","100%"),r.appendChild(u),r.innerHTML=r.innerHTML}exports.default=i;
},{"./LoadBuffer":8,"../lib/GetPeaks":9}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(i,_,s){void 0===i&&(i=85),void 0===_&&(_=169),this.config=void 0!==s?s:t.config,this.BPM_MIN=i,this.BPM_MAX=_,this.beat_counter=0,this.half_counter=0,this.quarter_counter=0,this.a_freq_range=new Array(this.config.BD_DETECTION_RANGES),this.ma_freq_range=new Array(this.config.BD_DETECTION_RANGES),this.maa_freq_range=new Array(this.config.BD_DETECTION_RANGES),this.last_detection=new Array(this.config.BD_DETECTION_RANGES),this.ma_bpm_range=new Array(this.config.BD_DETECTION_RANGES),this.maa_bpm_range=new Array(this.config.BD_DETECTION_RANGES),this.detection_quality=new Array(this.config.BD_DETECTION_RANGES),this.detection=new Array(this.config.BD_DETECTION_RANGES),this.reset()};t.prototype.reset=function(){for(var t=0;t<this.config.BD_DETECTION_RANGES;t++)this.a_freq_range[t]=0,this.ma_freq_range[t]=0,this.maa_freq_range[t]=0,this.last_detection[t]=0,this.ma_bpm_range[t]=this.maa_bpm_range[t]=60/this.BPM_MIN+(60/this.BPM_MAX-60/this.BPM_MIN)*(t/this.config.BD_DETECTION_RANGES),this.detection_quality[t]=0,this.detection[t]=!1;this.ma_quality_avg=0,this.ma_quality_total=0,this.bpm_contest=new Array,this.bpm_contest_lo=new Array,this.quality_total=0,this.quality_avg=0,this.current_bpm=0,this.current_bpm_lo=0,this.winning_bpm=0,this.win_val=0,this.winning_bpm_lo=0,this.win_val_lo=0,this.win_bpm_int=0,this.win_bpm_int_lo=0,this.bpm_predict=0,this.is_erratic=!1,this.bpm_offset=0,this.last_timer=0,this.last_update=0,this.bpm_timer=0,this.beat_counter=0,this.half_counter=0,this.quarter_counter=0},t.config_default={BD_DETECTION_RANGES:128,BD_DETECTION_RATE:12,BD_DETECTION_FACTOR:.915,BD_QUALITY_DECAY:.6,BD_QUALITY_TOLERANCE:.96,BD_QUALITY_REWARD:10,BD_QUALITY_STEP:.1,BD_MINIMUM_CONTRIBUTIONS:6,BD_FINISH_LINE:60,BD_REWARD_TOLERANCES:[.001,.005,.01,.02,.04,.08,.1,.15,.3],BD_REWARD_MULTIPLIERS:[20,10,8,1,.5,.25,1/8,1/16,1/32]},t.config=t.config_default,t.prototype.process=function(t,i){if(this.last_timer)if(this.last_timer>t)this.reset();else{var _=t;if(this.last_update=t-this.last_timer,this.last_timer=t,this.last_update>1)this.reset();else{var s,a,e=60/this.BPM_MAX,h=60/this.BPM_MIN,n=i.length/this.config.BD_DETECTION_RANGES,r=0;for(g=0;g<i.length;g+=n){for(this.a_freq_range[r]=0,s=g;s<g+n;s++)a=Math.abs(i[s]),this.a_freq_range[r]+=a;this.a_freq_range[r]/=n,this.ma_freq_range[r]-=(this.ma_freq_range[r]-this.a_freq_range[r])*this.last_update*this.config.BD_DETECTION_RATE,this.maa_freq_range[r]-=(this.maa_freq_range[r]-this.ma_freq_range[r])*this.last_update*this.config.BD_DETECTION_RATE;var o=this.ma_freq_range[r]*this.config.BD_DETECTION_FACTOR>=this.maa_freq_range[r];this.ma_bpm_range[r]>h&&(this.ma_bpm_range[r]=h),this.ma_bpm_range[r]<e&&(this.ma_bpm_range[r]=e),this.maa_bpm_range[r]>h&&(this.maa_bpm_range[r]=h),this.maa_bpm_range[r]<e&&(this.maa_bpm_range[r]=e);var m=!1;if(!this.detection[r]&&o){var c=_-this.last_detection[r];if(c<h&&c>e){for(s=0;s<this.config.BD_REWARD_TOLERANCES.length;s++)Math.abs(this.ma_bpm_range[r]-c)<this.ma_bpm_range[r]*this.config.BD_REWARD_TOLERANCES[s]&&(this.detection_quality[r]+=this.config.BD_QUALITY_REWARD*this.config.BD_REWARD_MULTIPLIERS[s],m=!0);m&&(this.last_detection[r]=_)}else if(c>=h){if((c/=2)<h&&c>e)for(s=0;s<this.config.BD_REWARD_TOLERANCES.length;s++)Math.abs(this.ma_bpm_range[r]-c)<this.ma_bpm_range[r]*this.config.BD_REWARD_TOLERANCES[s]&&(this.detection_quality[r]+=this.config.BD_QUALITY_REWARD*this.config.BD_REWARD_MULTIPLIERS[s],m=!0);m||(c*=2),this.last_detection[r]=_}if(m){var l=this.detection_quality[r]/this.quality_avg*this.config.BD_QUALITY_STEP;l>1&&(l=1),this.ma_bpm_range[r]-=(this.ma_bpm_range[r]-c)*l,this.maa_bpm_range[r]-=(this.maa_bpm_range[r]-this.ma_bpm_range[r])*l}else c>=e&&c<=h?(this.detection_quality[r]<this.quality_avg*this.config.BD_QUALITY_TOLERANCE&&this.current_bpm&&(this.ma_bpm_range[r]-=(this.ma_bpm_range[r]-c)*this.config.BD_QUALITY_STEP,this.maa_bpm_range[r]-=(this.maa_bpm_range[r]-this.ma_bpm_range[r])*this.config.BD_QUALITY_STEP),this.detection_quality[r]-=this.config.BD_QUALITY_STEP):c>=h&&(this.detection_quality[r]<this.quality_avg*this.config.BD_QUALITY_TOLERANCE&&this.current_bpm&&(this.ma_bpm_range[r]-=.5*(this.ma_bpm_range[r]-this.current_bpm),this.maa_bpm_range[r]-=.5*(this.maa_bpm_range[r]-this.ma_bpm_range[r])),this.detection_quality[r]-=this.config.BD_QUALITY_STEP)}(!m&&_-this.last_detection[r]>h||o&&Math.abs(this.ma_bpm_range[r]-this.current_bpm)>this.bpm_offset)&&(this.detection_quality[r]-=this.detection_quality[r]*this.config.BD_QUALITY_STEP*this.config.BD_QUALITY_DECAY*this.last_update),this.detection_quality[r]<.001&&(this.detection_quality[r]=.001),this.detection[r]=o,r++}this.quality_total=0;for(var p=0,g=0;g<this.config.BD_DETECTION_RANGES;g++)this.quality_total+=this.detection_quality[g];this.quality_avg=this.quality_total/this.config.BD_DETECTION_RANGES,this.quality_total?(this.ma_quality_avg+=(this.quality_avg-this.ma_quality_avg)*this.last_update*this.config.BD_DETECTION_RATE/2,this.maa_quality_avg+=(this.ma_quality_avg-this.maa_quality_avg)*this.last_update,this.ma_quality_total+=(this.quality_total-this.ma_quality_total)*this.last_update*this.config.BD_DETECTION_RATE/2,this.ma_quality_avg-=.98*this.ma_quality_avg*this.last_update*3):this.quality_avg=.001,this.ma_quality_total<=0&&(this.ma_quality_total=.001),this.ma_quality_avg<=0&&(this.ma_quality_avg=.001);var u=0,f=this.current_bpm,b=new Array;if(this.quality_avg)for(g=0;g<this.config.BD_DETECTION_RANGES;g++)if(this.detection_quality[g]*this.config.BD_QUALITY_TOLERANCE>=this.ma_quality_avg&&this.ma_bpm_range[g]<h&&this.ma_bpm_range[g]>e){this.maa_bpm_range[g];var E=Math.round(60/this.maa_bpm_range[g]*1e3);E=Math.abs(Math.ceil(E)-60/this.current_bpm*1e3)<Math.abs(Math.floor(E)-60/this.current_bpm*1e3)?Math.ceil(E/10):Math.floor(E/10);var T=parseInt(E/10);b[T],b[T]=0,b[T]+=this.detection_quality[g]/this.quality_avg,p++,0==f?f=this.maa_bpm_range[g]:u+=Math.abs(f-this.maa_bpm_range[g])}var D=0,v=0;if(p>=this.config.BD_MINIMUM_CONTRIBUTIONS){for(var I in b)b[I]>v&&(v=b[I],D=I);this.bpm_predict=60/(D/10),u/=p,this.bpm_offset=u,this.current_bpm||(this.current_bpm=this.bpm_predict)}this.current_bpm&&this.bpm_predict&&(this.current_bpm-=(this.current_bpm-this.bpm_predict)*this.last_update);var A=0;for(var q in this.bpm_contest)if(A<this.bpm_contest[q]&&(A=this.bpm_contest[q]),this.bpm_contest[q]>this.config.BD_FINISH_LINE/2){var N=parseInt(Math.round(q/10));this.bpm_contest_lo[N]!=this.bpm_contest_lo[N]&&(this.bpm_contest_lo[N]=0),this.bpm_contest_lo[N]+=this.bpm_contest[q]/6*this.last_update}if(A>this.config.BD_FINISH_LINE)for(var q in this.bpm_contest)this.bpm_contest[q]=this.bpm_contest[q]/A*this.config.BD_FINISH_LINE;A=0;for(var q in this.bpm_contest_lo)A<this.bpm_contest_lo[q]&&(A=this.bpm_contest_lo[q]);if(A>this.config.BD_FINISH_LINE)for(var q in this.bpm_contest_lo)this.bpm_contest_lo[q]=this.bpm_contest_lo[q]/A*this.config.BD_FINISH_LINE;for(q in this.bpm_contest)this.bpm_contest[q]-=this.bpm_contest[q]*(this.last_update/this.config.BD_DETECTION_RATE);for(q in this.bpm_contest_lo)this.bpm_contest_lo[q]-=this.bpm_contest_lo[q]*(this.last_update/this.config.BD_DETECTION_RATE);this.bpm_timer+=this.last_update;var d=0,B=0;if(this.bpm_timer>this.winning_bpm/4&&this.current_bpm){if(this.win_val=0,this.win_val_lo=0,this.winning_bpm)for(;this.bpm_timer>this.winning_bpm/4;)this.bpm_timer-=this.winning_bpm/4;this.quarter_counter++,this.half_counter=parseInt(this.quarter_counter/2),this.beat_counter=parseInt(this.quarter_counter/4);var y=parseInt(Math.round(60/this.current_bpm*10));void 0===this.bpm_contest[y]&&(this.bpm_contest[y]=0),this.bpm_contest[y]+=this.config.BD_QUALITY_REWARD;for(var q in this.bpm_contest)this.win_val<this.bpm_contest[q]&&(d=q,this.win_val=this.bpm_contest[q]);d&&(this.win_bpm_int=parseInt(d),this.winning_bpm=60/(d/10));for(var q in this.bpm_contest_lo)this.win_val_lo<this.bpm_contest_lo[q]&&(B=q,this.win_val_lo=this.bpm_contest_lo[q]);B&&(this.win_bpm_int_lo=parseInt(B),this.winning_bpm_lo=60/B),"undefined"!=typeof console&&this.beat_counter}}}else this.last_timer=t},t.modules=new Object,t.modules.vis=new Object,t.modules.vis.BassKick=function(){this.is_kick=!1},t.modules.vis.BassKick.prototype.process=function(t){this.is_kick=t.detection[0]&&t.detection[1]||t.ma_freq_range[0]/t.maa_freq_range[0]>1.4},t.modules.vis.BassKick.prototype.isKick=function(){return this.is_kick},t.modules.vis.VU=function(){this.vu_levels=new Array},t.modules.vis.VU.prototype.process=function(t,i){var _,s,a=0;for(void 0===i&&(i=t.last_update),_=0;_<t.config.BD_DETECTION_RANGES;_++)(s=t.ma_freq_range[_]/t.maa_freq_range[_])>a&&(a=s);for(a<=0&&(a=1),_=0;_<t.config.BD_DETECTION_RANGES;_++)(s=t.ma_freq_range[_]/t.maa_freq_range[_])!=s&&(s=0),s>1?((s-=1)>1&&(s=1),s>this.vu_levels[_]?this.vu_levels[_]=s:t.current_bpm&&(this.vu_levels[_]-=(this.vu_levels[_]-s)*i*(1/t.current_bpm)*3)):t.current_bpm&&(this.vu_levels[_]-=i/t.current_bpm*2),(this.vu_levels[_]<0||this.vu_levels[_]!=this.vu_levels[_])&&(this.vu_levels[_]=0)},t.modules.vis.VU.prototype.getLevel=function(t){return this.vu_levels[t]},exports.default=t;
},{}],11:[function(require,module,exports) {
"use strict";function t(t,e){var l,u=document.querySelector(t),r="http://www.w3.org/2000/svg";(l=document.createElementNS(r,"rect")).setAttributeNS(null,"x",100*e+"%"),l.setAttributeNS(null,"y",0),l.setAttributeNS(null,"width",1),l.setAttributeNS(null,"height","100%"),u.appendChild(l),(l=document.createElementNS(r,"rect")).setAttributeNS(null,"class","progress"),l.setAttributeNS(null,"y",0),l.setAttributeNS(null,"width",1),l.setAttributeNS(null,"height","100%"),u.appendChild(l)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./LoadBuffer"),t=a(e),r=require("../lib/Beatdetektor"),u=a(r),n=require("./DrawPeaks"),o=a(n);function a(e){return e&&e.__esModule?e:{default:e}}function s(e,r,n){let a=new AudioContext,s=new u.default,c=new u.default.modules.vis.VU,i=new u.default.modules.vis.BassKick;return(0,t.default)(a,r,function(t){var r=a.destination;let u=document.querySelector("#audio");var d=a.createBufferSource();d.buffer=t;var f=a.createScriptProcessor(2048),l=0;d.connect(f),f.connect(r),f.onaudioprocess=function(t){var r=t.inputBuffer.getChannelData(0);if(s.process(a.currentTime,r),i.process(s),i.is_kick){let t=u.currentTime/e;(0,o.default)(n,t)}(l+=s.last_update)>1/24&&(c.process(s,l),l=0)},d.start(0),a.suspend()}),a}exports.default=s;
},{"./LoadBuffer":8,"../lib/Beatdetektor":10,"./DrawPeaks":11}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(t,i){this.holdTime=.33,this.decayRate=.97,this.minVolume=.2,this.frequencyBinCount=100;var n=0,u=this.minVolume;this.update=function(o){var a=e.compute(t,this.frequencyBinCount);n>0?(n-=o,n=Math.max(n,0)):a>u?(i(),n=this.holdTime,u=1.1*a,u=Math.max(u,this.minVolume)):(u*=this.decayRate,u=Math.max(u,this.minVolume))}};e.compute=function(e,t,i){t=void 0!==t?t:e.frequencyBinCount,i=void 0!==i?i:0;var n=new Uint8Array(e.frequencyBinCount);e.getByteFrequencyData(n);for(var u=0,o=i;o<i+t;o++)u+=n[o];return u/(256*t-1)},exports.default=e;
},{}],6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./LoadBuffer"),t=o(e),r=require("../lib/AnalyserBeatDetector"),n=o(r),u=require("./DrawPeaks"),a=o(u);function o(e){return e&&e.__esModule?e:{default:e}}function i(e,r,u){let o=new AudioContext,i=document.querySelector("#audio");var c=o.createAnalyser();(0,t.default)(o,r,function(e){var t=o.createBufferSource();t.buffer=e,t.connect(c),t.start(0),o.suspend()});var d=new n.default(c,function(){let t=i.currentTime/e;(0,a.default)(u,t)});let f;return function e(){d.update(1/60),f=requestAnimationFrame(e)}(),i.addEventListener("ended",()=>{window.cancelAnimationFrame(f)},{once:!0}),o}exports.default=i;
},{"./LoadBuffer":8,"../lib/AnalyserBeatDetector":12,"./DrawPeaks":11}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t={};(function(){var e=null;try{e=new(window.AudioContext||window.webkitAudioContext)}catch(t){alert("Sorry, the web audio api is not supported by your browser!")}this.BeatDetector=function(i){if(!(this instanceof t.BeatDetector))return new BeatDetector(i);this.context=e,this.historyBuffer=[],this.instantEnergy=0,this.prevTime=0,this.bpmTable=[],this.bpm={time:0,counter:0},this.startTime=0,this.startOffset=0,this.settings=i,this.loading=!1,this.analyser=e.createAnalyser(),this.visualizer=e.createAnalyser(),this.visualizer.fftSize=i.visualizerFFTSize?i.visualizerFFTSize:256,this.analyser.fftSize=i.analyserFFTSize?i.analyserFFTSize:256,this.MAX_COLLECT_SIZE=this.analyser.fftSize/2*43,this.COLLECT_SIZE=1,this.sens=1+(i.sens?i.sens/100:.05),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,this.bufferLength=this.analyser.frequencyBinCount;for(var s=0;this.historyBuffer.length<this.MAX_COLLECT_SIZE-this.COLLECT_SIZE-1;s++)this.historyBuffer.push(1);this.bandpassFilter=e.createBiquadFilter(),this.bandpassFilter.type="string"==typeof this.bandpassFilter.type?"bandpass":2,this.bandpassFilter.frequency.value=i.passFreq?i.passFreq:400,this.bandpassFilter.Q.value=.5,this.gainNode=e.createGain()||e.createGainNode();var r=this;if(i.url){this.soundSource=e.createBufferSource();var n=new XMLHttpRequest;this.loading=!0,n.open("GET",i.url,!0),n.responseType="arraybuffer","function"==typeof this.settings.progress&&(n.addEventListener("progress",function(t){var e=0;t.lengthComputable&&(e=t.loaded/t.total*100),i.progress({percent:e,complete:!1})},!1),n.addEventListener("load",function(t){i.progress({percent:100,complete:!0})},!1)),n.onload=function(){var t=n.response;e.decodeAudioData(t,function(t){r.soundSource.buffer=r.soundBuffer=t,r.currentDuration=r.soundBuffer.duration,r.loading=!1,r.startTime=e.currentTime},function(t){alert("Error decoding audio data")})},n.send(),this.connectGraph(),this.soundSource.start?this.soundSource.start(0):this.soundSource.noteOn(0),e.suspend()}else{navigator.getUserMedia({audio:{mandatory:{googEchoCancellation:"false",googAutoGainControl:"false",googNoiseSuppression:"false",googHighpassFilter:"false"},optional:[]}},function(t){r.soundSource=e.createMediaStreamSource(t),r.soundSource.connect(r.analyser),r.soundSource.connect(r.visualizer),r.soundSource.connect(r.gainNode),r.gainNode.connect(e.destination),r.micStream=t},function(t){alert("Error getting microphone audio")})}},this.BeatDetector.prototype={setVolume:function(t){this.gainNode.gain.value=t*t},getVolume:function(){return this.gainNode.gain.value},pause:function(){this.soundSource.playbackState===this.soundSource.PLAYING_STATE?(this.soundSource.stop(0),this.startOffset+=e.currentTime-this.startTime):void 0!==this.micStream&&this.micStream.stop()},play:function(t){this.startOffset+=t,this.startOffset<0&&(this.startOffset=0),this.soundSource=e.createBufferSource(),this.soundSource.buffer=this.soundBuffer,this.connectGraph(),this.soundSource.start(0,this.startOffset%this.soundBuffer.duration),this.startTime=e.currentTime},isFinished:function(t){var e="undefined"===this.currentDuration?0:this.currentDuration;if(this.getElapsedTime()>=e&&0!=e)return this.soundSource.playbackState===this.soundSource.PLAYING_STATE&&(this.soundSource.stop(0),"function"==typeof this.settings.playbackFinished&&this.settings.playbackFinished()),!0},connectGraph:function(){this.settings.passFreq?(this.soundSource.connect(this.bandpassFilter),this.bandpassFilter.connect(this.analyser)):this.soundSource.connect(this.analyser),this.soundSource.connect(this.visualizer),this.soundSource.connect(this.gainNode)},isOnBeat:function(){var t=0,i=0,s=!1,r=new Uint8Array(this.bufferLength);this.analyser.getByteFrequencyData(r),this.isFinished();for(var n=0;n<r.length-1;n++,++i)this.historyBuffer.push(r[n]),this.instantEnergy+=r[n];if(i>this.COLLECT_SIZE-1&&this.historyBuffer.length>this.MAX_COLLECT_SIZE-1){this.instantEnergy=this.instantEnergy/(this.COLLECT_SIZE*(this.analyser.fftSize/2));var a=0;for(n=0;n<this.historyBuffer.length-1;n++)a+=this.historyBuffer[n];t=a/this.historyBuffer.length;var o=e.currentTime-this.prevTime;if(o>2&&this.bpmTable.length>0)for(var u=0;u<this.bpmTable.length-1;u++){Math.round(o/this.bpmTable[u].time*1e3)%(1e3*Math.round(this.bpmTable[u].time))==0&&(o=new Number(this.bpmTable[u].time))}if(o>3&&(this.prevTime=o=0),e.currentTime>.29&&this.instantEnergy>t&&this.instantEnergy>this.sens*t&&(o<2&&o>.29||0==this.prevTime)){s=!0,this.prevTime=e.currentTime,this.bpm={time:o.toFixed(3),counter:1};for(u=0;u<this.bpmTable.length;u++)if(this.bpmTable[u].time==this.bpm.time){this.bpmTable[u].counter++,this.bpm=0,this.bpmTable[u].counter;break}0==this.bpm&&0!=this.bpmTable.length||this.bpmTable.push(this.bpm),this.bpmTable.sort(function(t,e){return e.counter-t.counter})}var h=this.historyBuffer.slice(0);this.historyBuffer=[],this.historyBuffer=h.slice(this.COLLECT_SIZE*(this.analyser.fftSize/2),h.length),i=0,this.instantEnergy=0,t=0}for(this.debug="",n=0;n<10&&!(n>=this.bpmTable.length);n++)this.debug+="Beat "+n+": "+this.bpmTable[n].time+", counter: "+this.bpmTable[n].counter+", calc. bpm: "+Math.round(60/this.bpmTable[n].time)+"<br>";return this.debug+="history buffer size: "+this.historyBuffer.length+"<br>",this.debug+="instant energy: "+this.instantEnergy+"<br>",this.debug+="local energy: "+t+"<br>",this.debug+="bpmArray size: "+r.length+"<br>",this.debug+="sensitivity: "+(100*(this.sens-1)).toFixed(2)+"<br>",s},getAudioFreqData:function(){var t=new Uint8Array(this.bufferLength);return this.visualizer.getByteFrequencyData(t),t},getTimeDomainData:function(){var t=new Uint8Array(this.bufferLength);return this.visualizer.getByteTimeDomainData(t),t},getDuration:function(){return void 0===this.soundBuffer?0:this.soundBuffer.duration},getElapsedTime:function(){return e.currentTime+this.startOffset-this.startTime},getDebugData:function(){return this.debug},getFileName:function(){var t=this.settings.url.split("/");return t[t.length-1]},getBPMGuess:function(){var t=allGuesses=0,e=0;if(this.bpmTable.length<=2)return-1;for(var i=0;i<this.bpmTable.length;i++)allGuesses+=new Number(this.bpmTable[i].time),this.bpmTable[i].counter>1&&(t+=new Number(this.bpmTable[i].time),e++);return{conservative:Math.round(60/(t/e)),all:Math.round(60/(allGuesses/this.bpmTable.length))}}}}).call(t),exports.default=t;
},{}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./LoadBuffer"),t=i(e),r=require("../lib/Beatdetector_stasilo"),u=i(r),o=require("./DrawPeaks"),a=i(o);function i(e){return e&&e.__esModule?e:{default:e}}function n(e,t,r){let o=new u.default.BeatDetector({url:t}),i=document.querySelector("#audio");return function t(){if(o.isOnBeat()){let t=i.currentTime/e;(0,a.default)(r,t)}requestAnimationFrame(t)}(),o.context}exports.default=n;
},{"./LoadBuffer":8,"../lib/Beatdetector_stasilo":13,"./DrawPeaks":11}],2:[function(require,module,exports) {
"use strict";var e=require("./component/FirstBeatAnalyser"),t=i(e),n=require("./component/SecondBeatAnalyser"),d=i(n),r=require("./component/ThirdBeatAnalyser"),s=i(r),a=require("./component/FourthBeatAnalyser"),u=i(a);function i(e){return e&&e.__esModule?e:{default:e}}function l(e){e=e||"/dist/audio/test.mp3";let n=document.querySelector("#audio"),r=document.querySelector("#play");n.loop=!1,n.src=e,n.addEventListener("canplaythrough",()=>{let a=n.duration;(0,t.default)(a,e,"#svg");let i=(0,d.default)(a,e,"#svg1"),l=(0,s.default)(a,e,"#svg2"),o=(0,u.default)(a,e,"#svg3"),c=()=>{if(!n.paused){var e=document.querySelectorAll(".progress");if(e&&a)for(let t=0;t<e.length;t++)e[t].setAttribute("x",100*n.currentTime/a+"%");requestAnimationFrame(c)}};n.addEventListener("play",c),n.addEventListener("playing",c);let p=()=>{r.innerHTML=n.paused?"Play track":"Pause track"};function m(){n.paused?(n.play(),i.resume(),l.resume(),o.resume()):(n.pause(),i.suspend(),l.suspend(),o.suspend())}n.addEventListener("play",p),n.addEventListener("playing",p),n.addEventListener("pause",p),n.addEventListener("ended",p),r.addEventListener("click",m),n.addEventListener("ended",()=>{n.pause(),i.suspend(),l.suspend(),o.suspend(),r.removeEventListener("click",m),r.addEventListener("click",()=>{n.paused?n.play():n.pause()})},{once:!0})},{once:!0})}window.onload=(()=>{let e=document.getElementById("beginBtn"),t=document.getElementById("file"),n=document.getElementById("beginPanel");e.addEventListener("click",()=>{n.remove(),l()}),t.addEventListener("change",()=>{let e=t.files[0],d=URL.createObjectURL(e);setTimeout(()=>{n.remove(),l(d)},500)})});
},{"./component/FirstBeatAnalyser":4,"./component/SecondBeatAnalyser":5,"./component/ThirdBeatAnalyser":6,"./component/FourthBeatAnalyser":7}]},{},[2])