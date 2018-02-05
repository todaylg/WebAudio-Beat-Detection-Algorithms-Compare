import FirstBeatAnalyser from './component/FirstBeatAnalyser';
import SecondBeatAnalyser from './component/SecondBeatAnalyser';
import ThirdBeatAnalyser from './component/ThirdBeatAnalyser';
import FourthBeatAnalyser from './component/FourthBeatAnalyser';
//Todo FifthFourthBeatAnalyser => DWT

function Init(musicSrc) {
    musicSrc = musicSrc || '/dist/audio/test.mp3';

    let audioTag = document.querySelector('#audio'),
        playButton = document.querySelector('#play');

    audioTag.loop = false;
    audioTag.src = musicSrc;

    audioTag.addEventListener("canplaythrough", () => {
        let duration = audioTag.duration;
        //Begin Analyser
        FirstBeatAnalyser(duration, musicSrc, "#svg");

        let secondContext = SecondBeatAnalyser(duration, musicSrc, "#svg1");

        let thirdContext = ThirdBeatAnalyser(duration, musicSrc, "#svg2");

        let fourthContext = FourthBeatAnalyser(duration, musicSrc, "#svg3");

        //Event Init
        let updateProgressState = () => {
            if (audioTag.paused) {
                return;
            }
            var progressIndicator = document.querySelectorAll('.progress');

            if (progressIndicator && duration) {
                for (let i = 0; i < progressIndicator.length; i++) {
                    progressIndicator[i].setAttribute('x', (audioTag.currentTime * 100 / duration) + '%');
                }
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

        function firstLoop() {
            if (audioTag.paused) {
                audioTag.play();
                secondContext.resume();
                thirdContext.resume();
                fourthContext.resume();
            } else {
                audioTag.pause();
                secondContext.suspend();
                thirdContext.suspend();
                fourthContext.suspend();
            }
        }
        playButton.addEventListener('click', firstLoop);

        audioTag.addEventListener('ended', () => {
            audioTag.pause();
            //播放完成
            secondContext.suspend();
            thirdContext.suspend();
            fourthContext.suspend();

            // let progressArr = document.getElementsByClassName('preProgress');
            // for(let i=0;i<progressArr.length;i++){
            //     progressArr[i].classList.add('progress');
            // }

            playButton.removeEventListener('click', firstLoop);

            playButton.addEventListener('click', () => {
                if (audioTag.paused) {
                    audioTag.play();
                } else {
                    audioTag.pause();
                }
            })
        }, { once: true })

    }, { once: true });
}

//Begin
window.onload = () => {
    let beginBtn = document.getElementById('beginBtn');
    let audioFile =  document.getElementById('file');
    let beginPanel = document.getElementById('beginPanel');
    beginBtn.addEventListener('click', () => {
        beginPanel.remove();
        Init();
    })
    audioFile.addEventListener('change',() => {
        let file = audioFile.files[0];
        let musicSrc = URL.createObjectURL(file);
        setTimeout(() => {
            beginPanel.remove();
            Init(musicSrc);
        }, 500);
    })
}
