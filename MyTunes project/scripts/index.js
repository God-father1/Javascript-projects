import { radioPlayerInit } from './radioPlayer.js';
import { radioPlayerStop } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { videoPlayerStop } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { musicPlayerStop } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//функция для скрытия плееров
const deactivationPlayer = () => {
    musicPlayerStop();
    radioPlayerStop();
    videoPlayerStop();
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
}

//функция для показа плееров 
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    }));    
    
videoPlayerInit();
musicPlayerInit();
radioPlayerInit();


