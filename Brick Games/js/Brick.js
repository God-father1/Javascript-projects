class Brick extends Object{
    constructor(x, y, type){
        super(`<div class="brick" data-life="2" data-type="${type}"></div>`)
        this.x = x;
        this.y = y;
        this.w = WIDTH;
        this.h = HEIGHT;
        this.life = 2;
        this.type = type;

        this.draw();
    }
}