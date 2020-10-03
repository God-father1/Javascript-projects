import { addZero } from './supScript.js'

const audio = document.querySelector('.audio');
const audioImg = document.querySelector('.audio-img');
const audioHeader = document.querySelector('.audio-header');
const audioPlayer = document.querySelector('.audio-player');
const audioNavigation = document.querySelector('.audio-navigation');
const audioButtonPlay = document.querySelector('.audio-button__play');
const audioProgress = document.querySelector('.audio-progress');
const audioProgressTiming = document.querySelector('.audio-progress__timing');
const audioTimePassed = document.querySelector('.audio-time__passed');
const audioTimeTotal = document.querySelector('.audio-time__total');
const audioVolume = document.querySelector('.audio-volume');
const audioSound = document.querySelector('.audio-sound');

export const musicPlayerInit = () => {
    
    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    //функция получения трека 
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioImg.src = `./audio/${track}.jpg`
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed){
            audioPlayer.pause();
        }else{
            audioPlayer.play();
        }
    }

    const prevTrack = () => {
       
        if (trackIndex != 0){
            trackIndex--;
        }else{
            trackIndex = playList.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
       
        if (trackIndex === playList.length - 1){
            trackIndex = 0;
        }else{
            trackIndex++;
        }
        loadTrack();
    };

    const onTimeChange = () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';
        
        
        let minutePassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minuteTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';
    
        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        
        if (target.classList.contains('audio-button__play')) {
            
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused){
                audioPlayer.play();
            }else{
                audioPlayer.pause();
            }
            loadTrack();
        }
        if (target.classList.contains('audio-button__prev')) {
             prevTrack();
        }
        
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', onTimeChange);

    audioProgress.onclick = event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    }

    audioVolume.addEventListener('input', () => {
        const value = audioVolume.value;
        audioPlayer.volume = value / 10;   
        if (value > 0){
            audioSound.classList.replace('fa-volume-off','fa-volume-up');
        }else{
            audioSound.classList.replace('fa-volume-up','fa-volume-off');
        }
    });
    
    let value = audioVolume.value;
    let volume = audioPlayer.volume;
    audioSound.addEventListener('click', () => {
        if (audioVolume.value == 0){
            audioPlayer.volume = volume;
            audioVolume.value = value;
            audioSound.classList.replace('fa-volume-off','fa-volume-up');
        }else{
            value = audioVolume.value;
            volume = audioPlayer.volume;
            audioPlayer.volume = 0;
            audioVolume.value = 0;
            audioSound.classList.replace('fa-volume-up','fa-volume-off');
        }
    });
};

export const musicPlayerStop = () => {
    audioPlayer.pause();
    audio.classList.remove('play');
    audioButtonPlay.classList.replace('fa-pause','fa-play');
};