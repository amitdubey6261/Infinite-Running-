import Experience from "./Experience";

export default class Eventlisteners{
    experince : Experience ; 
    constructor(){
        this.experince = new Experience();

        window.addEventListener('pointerdown' , this.pointerdown.bind(this));
        window.addEventListener('pointerup' , this.pointerup.bind(this));
        window.addEventListener('keydown' , this.keydown.bind(this));
        window.addEventListener('keyup' , this.keyup.bind(this));
        window.addEventListener('pointermove' , this.pointermove.bind(this));
    }

    canvasDragOver(event: DragEvent){
        event.preventDefault();
        this.experince.canvas.style.cursor = 'copy' ; 
    }

    pointerdown(){

    }

    pointerup(){
    }

    keydown(event: KeyboardEvent){
        // this.experince.camera.keydown(event); 
        this.experince.world.character.keydown(event);
    }

    pointermove(){
    }

    keyup(){
    }
}