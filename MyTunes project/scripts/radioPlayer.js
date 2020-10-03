const radio = document.querySelector('.radio');
const radioCoverImg = document.querySelector('.radio-cover__img');
const radioNavigation = document.querySelector('.radio-navigation');
const radioHeaderBig = document.querySelector('.radio-header__big');
const radioItem = document.querySelectorAll('.radio-item');
const radioStop = document.querySelector('.radio-stop');
const radioVolume = document.querySelector('.radio-volume');
const radioSound = document.querySelector('.radio-sound');
const audio = new Audio();


export const radioPlayerInit = () => {
   audio.type = 'audio/aac';

   radioStop.disabled = true;


    const changeIconPlay = () => {
        if (audio.paused){
            radio.classList.remove('play');  // остановка анимации
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        }else{
            radio.classList.add('play');    // запуск анимации барабана
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }
 
    // функция выделения выбранного элемента 
   const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
   }

   radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent; // переменная хранящая выбранное радио
        radioHeaderBig.textContent = title;  // замена заголовка на название выбранного радио

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion; // получаем ссылку на радио
        audio.play();
        changeIconPlay();
   });

   radioStop.addEventListener('click', () => {
       if (audio.paused) {
           audio.play();
       }else {
           audio.pause();
       }
       changeIconPlay();
   });

   radioVolume.addEventListener('input', () => {
        const value = radioVolume.value;
        audio.volume = value / 10;
        if (value > 0){
            radioSound.classList.replace('fa-volume-off','fa-volume-up');
        }else{
            radioSound.classList.replace('fa-volume-up','fa-volume-off');
        }
   });

   let value = radioVolume.value;
   let volume = audio.volume;
   radioSound.addEventListener('click', () => {
    if (radioVolume.value == 0){
        audio.volume = volume;
        radioVolume.value = value;
        radioSound.classList.replace('fa-volume-off','fa-volume-up');
    }else{
        value = radioVolume.value;
        volume = audio.volume;
        audio.volume = 0;
        radioVolume.value = 0;
        radioSound.classList.replace('fa-volume-up','fa-volume-off');
    }
    
    });

}

export const radioPlayerStop = () => {
    audio.pause();
    radio.classList.remove('play');  // остановка анимации
    radioStop.classList.add('fa-play');
    radioStop.classList.remove('fa-stop');
}

