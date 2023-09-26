import Canvas from "/js/Canvas.js";
import Logic from "/js/Logic.js";

class Main {
    
    static start() {
        this.canvas = new Canvas();
        this.logic  = new Logic(this.canvas);
        
        
        this.update()
    }
    //
    static popUp() {
        let block = document.createElement('div');
        block.className = 'block' //  [[x is won][btn: restart]]
        block.innerHTML = `<div>${this.logic.winner} is won!</div>
                           <button>restart</button>`;
        document.body.append(block);

        block.querySelector('button').onclick = () => {
            block.remove();
            this.start();
        }
    } 
    
    static update() {
        this.canvas.update();
        this.logic.draw();

        if (this.logic.winner) {
            this.popUp();
        } else {
            requestAnimationFrame(this.update.bind(this))
        }
    }

}

Main.start()