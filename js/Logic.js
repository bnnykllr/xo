import random from "/js/random.js";


export default class Logic {
    constructor(cnv) {
        
        this.data   = this.createData();
        this.canvas = cnv.canvas;
        this.ctx    = cnv.ctx;
        this.w      = cnv.w;
        this.h      = cnv.h;
        this.winner = false;

        this.addNavigation();
    }

    createData() {
        let data = [];
        for (let y = 0; y < 3; y++) {
            data.push([])
            for (let x = 0; x < 3; x++) {
                data[y].push(false);
            }
        }
        return data
    }

    pushX() {
        let freeCells = [];
        this.data.forEach((a, y) => a.forEach((el,x) => {
            if (el !== 0 && el !== 'X') freeCells.push({x:x, y:y});
        }));

        let randFreeCell = freeCells[random(0,freeCells.length -1)];
        if (!randFreeCell) return
        let [x,y] = [randFreeCell.x, randFreeCell.y];
        this.data[y][x] = 'X';
        if (this.win('X')) return
    }

    addNavigation() {
        this.canvas.addEventListener('click', e => {
            let [x, y] = [e.offsetX, e.offsetY];
            [x,y] = [x/(this.w / 3), y/(this.h/3)].map(el => Math.floor(el));
            if (this.data[y][x] == 'X' || this.data[y][x] === 0) return
            this.data[y][x] = 0;
            if (this.win(0)) return;

            this.pushX();
        });
    }

    draw() {
        this.data.forEach((a, y) => a.forEach((el, x) => {
            let [nX, nY] = [x * (this.w / 3) + this.w / 3 * 0.5,
                            y * (this.h / 3) + this.h / 3 * 0.5];
            this.ctx.beginPath();
            this.ctx.lineWidth = 3;

            if (el === 0) {
                this.ctx.strokeStyle = 'rgba(100,50,100,0.8)';
                this.ctx.arc(nX, nY, this.w / 3 / 2 * 0.6, 0, Math.PI * 2);
            }
            if (el == 'X') {
                this.ctx.strokeStyle = 'rgba(100,50,100,0.8)';
                let len = 30;
                this.ctx.moveTo(nX - len, nY - len);
                this.ctx.lineTo(nX + len, nY + len);
                this.ctx.moveTo(nX + len, nY - len);
                this.ctx.lineTo(nX - len, nY + len);
            }
            this.ctx.stroke();
                this.ctx.closePath();
        }))
      
        
    }

    win(el) {
        let win = false;
        let countX, countY
        let [countA, countB] = [0,0]

        for (let y = 0; y < 3; y++) {
            [countX, countY] = [0,0];

            for (let x = 0; x < 3; x++) {
                this.data[y][x]   === el ? countX++ : null
                this.data[x][y]   === el ? countY++ : null
            }

            this.data[y][y]   === el ? countA++ : null
            this.data[2-y][y] === el ? countB++ : null

            if ([countX, countY, countA, countB].includes(3)) {
                win = true;
                this.winner = `${el}`
                break;
            }
        }

        return win
    }

}

