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
        const finalScore = JSON.parse(localStorage.getItem('score')).score;
        console.log("Scene3 scores:", finalScore)
        //display final score 
        this.add.text(canvasWidth/2, 300, playerName +" : " + finalScore + "pts",{ font: '46px Arial', fill: '#ffffff' }).setOrigin(0.5)

    }

    update(){

    }

}//end bracket

export default Scene3