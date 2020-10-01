class Ball extends Object{
    constructor(x, y, rad){
        super(`<div class="ball"></div>`)
        this.rad = 0;
        this.speed = 1;
        this.life = 3;
        this.sx = 0;
        this.sy = 0;
        this.x = x;
        this.y = y;
        this.changeRad(rad);

        this.draw();
    }

    changeRad(rad){
        this.rad = Game.formatRad(rad);
        this.sx = Math.cos(this.rad * Math.PI / 180) * this.speed;
        this.sy = Math.sin(this.rad * Math.PI / 180) * this.speed;
    }

    update(){
        this.x += this.sx;
        this.y += this.sy;
    }

    draw(){
        this.object.css({
            top: this.y - RADIUS,
            left: this.x - RADIUS
        })
    }
}