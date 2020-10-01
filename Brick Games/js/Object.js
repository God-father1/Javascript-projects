class Object{
    constructor(object){
        this.object = $(object);
        $("#element").append(this.object);

        this.w = this.object[0].offsetWidth;
        this.h = this.object[0].offsetHeight;
    }

    draw(){
        this.object.css({
            top: this.y,
            left: this.x
        })
    }
}