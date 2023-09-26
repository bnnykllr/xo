export default class Canvas {

    constructor() {
        this.canvas = document.querySelector('#game');
        this.ctx = this.canvas.getContext('2d');
        this.h = 300;
        this.w = 300;
    }

    resize() {
        this.canvas.width  = this.w;
        this.canvas.height = this.h;
    } 

    drowLines() {
        let clr = 'rgba(100,100,100,0.5)'
        this.ctx.shadowColor = clr;
        this.ctx.shadowBlur  = 5;
        this.ctx.fillStyle   = clr;
        
        for (let i = 1; i < 3; i++) {
            this.ctx.fillRect(this.w / 3 * i, 0, 1, this.h)
            this.ctx.fillRect(0, this.h / 3 * i, this.w, 1)
        }
        
    }

    update() {
        this.resize();
        this.drowLines()
    }

}




