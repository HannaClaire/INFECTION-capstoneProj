import Phaser from "phaser";

class Scene3 extends Phaser.Scene {
    constructor () {
        super("gameOver")
    }

    preload(){
       
    }

    create() {  
        this.cameras.main.setBackgroundColor(0x000000)
        const canvasWidth = this.scale.canvas.width;
       // const canvasHeight = this.scale.canvas.height;
        const text = this.add.text(canvasWidth/2, 200, "GAME OVER!" ,{ font: '76px Arial', fill: '#ffffff' })
        text.setOrigin(0.5)

        //Display name and score
        const playerName = JSON.parse(localStorage.getItem('data')).userName;
        const finalScore = JSON.parse(localStorage.getItem('score')).finalScore;
        console.log("Scene3 scores:", finalScore)

        // const data = this.scene.scene.getData(); // Retrieve the data passed from Scene 1
        // const finalScore = data.finalScore; // Access the score variable

        this.add.text(canvasWidth/2, 300, playerName ,{ font: '46px Arial', fill: '#ffffff' }).setOrigin(0.5)
        this.add.text(canvasWidth/2, 450, finalScore ,{ font: '36px Arial', fill: '#ffffff' }).setOrigin(0.5)

    }

    update(){

    }

}//end bracket

export default Scene3