const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const points = document.getElementById('points');

//GAME VARIABLES
const tile = 50;

let difficulty;

const food = {
  x: 0,
  y: 0,
  color: 'red',
};

const snake = {
  body: [],
  direction: 'right',
  bodyColor: 'blue',
  headColor: 'green',
}

let newHead;

let lose = false;

let loop;

//CORE METHODS
function startGame() {
  snake.size = 3;
  snake.direction = 'right';
  snake.body = [];
  for (let i = 3; i > 0; i--) {
    newHead = {
      x: (tile * i),
      y: tile,
    }
    snake.body.push(newHead);
  }

  randomizeFood();

  lose = false;

  difficulty = 200;

  document.addEventListener('keydown', keyEvent);

  clearInterval(loop);
  loop = setInterval(update, difficulty);
}

function update() {
  render();

  points.innerHTML = 'Points: '+ snake.body.length;

  newHead = {...snake.body[0]};
  switch(snake.direction) {
    case 'right': 
      if((newHead.x + tile) >= canvas.width) {
        newHead.x = 0;
      } else {
        newHead.x += tile;
      }
      break;
    case 'left': 
      if((newHead.x) <= 0) {
        newHead.x = canvas.width - tile;
      } else {
        newHead.x -= tile;
      }
      break;
    case 'up': 
      if((newHead.y) <= 0) {
        newHead.y = canvas.height - tile;
      } else {
        newHead.y -= tile;
      }
      break;
    case 'down': 
      if((newHead.y + tile) >= canvas.height) {
        newHead.y = 0;
      } else {
        newHead.y += tile;
      }
      break;
  }

  if (newHead.x !== food.x || newHead.y !== food.y) {
    snake.body.pop();
  } else {
    randomizeFood();

    if (difficulty > 50 && snake.body.length % 5 === 0) {
      difficulty -= 15;

      clearInterval(loop);
      loop = setInterval(update, difficulty);
    }
  }
  snake.body.unshift(newHead);

  for (let i = 1; i < snake.body.length; i++) {
    if(snake.body[0].x === snake.body[i].x
      && snake.body[0].y === snake.body[i].y) {
        lose = true;
      }
  }

  if (lose) {
    clearInterval(loop);
  }

  console.log(snake.direction);
} 

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#A7D948';
  context.fillRect(0, 0, canvas.width, canvas.height);

  snake.body.forEach((element, index) => {
    context.fillStyle = snake.bodyColor;
    if(index === 0) {
      context.fillStyle = snake.headColor;  
    }

    context.fillRect(element.x, element.y, tile, tile);

    context.fillStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(element.x, element.y, tile - 1, tile - 1);
  });

  context.fillStyle = food.color;
  context.fillRect(food.x, food.y, tile, tile);

  context.fillStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(food.x, food.y, tile - 1, tile - 1);
}

function keyEvent() {
  if (event.keyCode === 65 && snake.direction !== 'right') {
    snake.direction = 'left';
  }
  if (event.keyCode === 68 && snake.direction !== 'left') {
    snake.direction = 'right';
  }
  if (event.keyCode === 87 && snake.direction !== 'down') {
    snake.direction = 'up';
  }
  if (event.keyCode === 83 && snake.direction !== 'up') {
    snake.direction = 'down';
  }
  if (event.keyCode === 32) {
    startGame();   
  }
}

function randomizeFood() {
  food.x = Math.floor(Math.random() * canvas.width / tile) * tile;
  food.y = Math.floor(Math.random() * canvas.height / tile) * tile;
  snake.body.forEach(element => {
    if(element.x === food.x && element.y === food.y) {
      food.x = Math.floor(Math.random() * canvas.width / tile) * tile;
      food.y = Math.floor(Math.random() * canvas.height / tile) * tile;
    }
  });
}