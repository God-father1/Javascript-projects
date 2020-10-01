class Game{
    constructor(){
        this.started = false;
        this.over = false;
        this.paused = false;
        this.muted = false;

        this.bricks = [];
        this.boundary = [];
        this.ball = [];
        this.pad = {};
        this.temp = [];
        this.incScore = 1;
        this.temp1 = [];
        this.score = 0;
        this.life = 3;
        this.round = 1;

        this.audio = {
            bg: new Audio('audio/bg.ogg'),
            destroyed: new Audio('audio/destroyed.ogg'),
            hit: new Audio('audio/hit.ogg')
        };

        this.audio.bg.loop = true;

        this.listener();
        this.generate();
        this.draw();
    }

    isCan(){
        return this.started && !this.over;
    }

    static formatRad(rad){
        return (rad + 360) % 360;
    }

    listener(){
        $('#gameboard').on('mousemove', (e) => {
            let container = $('.inner');
            this.pad.x = e.pageX - container[0].offsetLeft - this.pad.w / 2;
            this.pad.x = Math.max(0, Math.min(FULLW - this.pad.w, this.pad.x));
        });

        $("#start").on('click', (e) => {
            this.start();
        });
    }

    playSound(audio){
        this.audio[audio].currentTime = 0;
        this.audio[audio].play();
    }

    start(){
        $("#ready").removeClass("active");
        this.started = true;
        this.playSound('bg');
    }

    generate(){
        this.generateBoundary();
        this.generatePad();
        this.generateBrick();
        this.generateBall();
    }

    generateBoundary(){
        this.boundary.push(new Boundary(-1, 0, 1, FULLH));
        this.boundary.push(new Boundary(FULLW, 0, 1, FULLH));
        this.boundary.push(new Boundary(0, -1, FULLW, 1));
        // this.boundary.push(new Boundary(0, FULLH, FULLW, 1));
    }

    generatePad(){
        this.pad = new Pad();
    }

    generateBrick(){
        let bricks = [], arr = [29,2,2,1,1,1], can, type;
        for(let i = 0; i < 4; i++){
            for(let j = 0 ; j < 9 ; j ++){
                bricks.push([i, j]);
            }
        }

        while(bricks.length > 0){
            let brick = bricks.splice(Math.floor(Math.random() * bricks.length), 1)[0],
                i = brick[0],
                j = brick[1];

            if(i === 0 || i === 3 || j === 0 || j === 8){
                type = 0;
            }else{
                can = [];
                for(let i = 0; i < 6; i++){
                    if(arr[i] > 0) can.push(i);
                }
                type = can[Math.floor(Math.random() * can.length)];
            }
            arr[type]--;
            this.bricks.push(new Brick(STARTX + i * (WIDTH + GAPX), STARTY + j * (HEIGHT + GAPY), type));
        }
    }

    generateBall(){
        this.ball = [];
        $('#element .ball').remove();
        this.ball.push(new Ball(200, 600, 270));
    }

    draw(){
        for(let i = 0; i < 8; i++){
            if(this.isCan()){
                this.removeBrick();
                this.removeBall();
                this.filterBall();
                this.checkRound();
                this.checkBallBrick();
                this.checkLose();
                this.pad.draw();
                this.bricks.forEach((brick) =>{
                    brick.draw();
                });
                this.ball.forEach((ball) => {
                    ball.update();
                    ball.draw();
                });
            }
        }

        requestAnimationFrame(this.draw.bind(this));
    }

    checkLose(){
        if(this.ball.length === 0){
            this.playSound('destroyed');
            if(this.life){
                this.generateBall();
                this.life--;
                $("#life").html('x ' + this.life);
            }else{
                this.over = true;
                alert("Game Over");
            }
        }
    }

    checkRound(){
        if(this.bricks.length === 0){
            if(this.round < 8){
                this.generateBrick();
                this.generateBall();
                this.round ++;
                $("#round").html(this.round);
            } else{
                this.over = true;
                alert('You Won This Game!!');
            }
        }
    }

    checkBallBrick(){
        let bricks = [...this.bricks, ...this.boundary, this.pad];
        bricks.forEach((brick, i) => {
            let name = brick.constructor.name;
            this.ball.forEach((ball, j) => {
                let nx = Math.max(brick.x, Math.min(ball.x, brick.x + brick.w));
                let ny = Math.max(brick.y, Math.min(ball.y, brick.y + brick.h));
                let distX = nx - ball.x;
                let distY = ny - ball.y;
                let dist = Math.hypot(distY, distX);
                if(dist > 0 && dist <= RADIUS){
                    let rad = Math.atan(distY / distX) * 180 / Math.PI;
                    rad = Game.formatRad(distX < 0 ? rad + 180 : rad);
                    let mirror = (rad * 2) + 180 - ball.rad;

                    this.playSound('hit');
                    if(name === 'Brick'){
                        this.break(i, rad);

                    }
                    else if(name === 'Pad'){
                        this.incScore = 1;
                        let part = Math.floor((nx - brick.x) * 3 / brick.w);
                        if(part === 0) mirror = Math.max(190, mirror - 30);
                        else if(part === 2) mirror = Math.min(350, mirror + 30);
                    }

                    rad = (rad + 180) * Math.PI / 180;
                    ball.y = ny + Math.sin(rad) * RADIUS;
                    ball.x = nx + Math.cos(rad) * RADIUS;
                    ball.changeRad(mirror);
                }
            });
        });
    }

    break(i, rad, flag = 0){
        let brick = this.bricks[i];
        let cond = ((brick.type === 1 && ((rad >= 180 && rad <= 360) || rad === 0)) || (brick.type === 2 && rad >= 0 && rad <= 180));
        if(brick.life === 2 && !flag){
            if(brick.type !== 1 && brick.type !== 2 || cond){
                this.bricks[i].object.attr('data-life', 1);
                this.bricks[i].life = 1;
            }
        } else {
            if(brick.type === 0 || cond){
                this.addScore();
                this.temp.push(i);
            }

            else if(brick.type === 3){
                this.fiveBall();
                this.temp.push(i);
            }

            else if(brick.type === 4){
                this.power();
                this.temp.push(i);
            }

            else if(brick.type === 5){
                this.bomb(i);
                this.temp.push(i);
            }
        }
    }

    bomb(i){
        let curr = this.bricks[i];
        for(let j = 0; j < this.bricks.length ; j++){
            if(i !== j){
                let brick = this.bricks[j];
                if(curr.x === brick.x || curr.y === brick.y){
                    this.break(j, 180, 1);
                }
            }
        }
    }

    power(){

    }

    fiveBall(){
        let init = Math.floor(Math.random() * 45);
        for(let i = init; i <= 360 ; i += 90){
            let x = 200 + Math.cos(i * Math.PI / 180) * 30;
            let y = 600 + Math.cos(i * Math.PI / 180) * 30;
            this.ball.push(new Ball(x, y, i));
        }
    }

    removeBrick(){
        for(let i = this.bricks.length; i >= 0 ; i--){
            let index = this.temp.indexOf(i);
            if(index !== -1){
                this.bricks[i].object.remove();
                this.bricks.splice(i, 1);
            }
        }
        this.temp = [];
    }

    filterBall(){
        for(let i = this.ball.length - 1; i >= 0 ; i--){
            let ball = this.ball[i];
            if(ball.y > FULLH){
                this.temp1.push(i);
            }
        }
    }

    removeBall(){
        for(let i = this.ball.length - 1; i >= 0 ; i--){
            let index = this.temp1.indexOf(i);
            if(index !== -1){
                this.ball[i].object.remove();
                this.ball.splice(i, 1);
            }
        }
        this.temp1 = [];
    }

    addScore(){
        this.score += this.incScore++;
        $("#score").html(this.score);
    }
}