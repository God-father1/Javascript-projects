class Pad extends Object{
    constructor(){
        super(`<div class='pad'></div>`);
        this.x = (FULLW - this.w) / 2;
        this.y = FULLH - this.h - 50;

        this.draw();
    }

    draw(){
        super.draw();
    }
}