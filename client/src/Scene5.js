import Phaser from "phaser";
import WebFontFile from '/src/WebFontFile'
import {getUsers} from '/src/services.js'; 

class Scene3 extends Phaser.Scene {
    constructor () {
        super("youWin")
    }

    preload(){
    
        const fonts = new WebFontFile(this.load, 'Farro')
		this.load.addFile(fonts)
    }

    create() {  
        this.cameras.main.setBackgroundColor(0x6B1518)
        const canvasWidth = this.scale.canvas.width;

        // Add a keyboard key event to listen for the "y" key press to quit the game
        this.input.keyboard.on('keydown-P', this.playAgain, this);
        this.add.text(canvasWidth/2, 400, "Press P for next level ", {fontSize: "20px"}).setOrigin(0.5);
  
       // const canvasHeight = this.scale.canvas.height;
        const text = this.add.text(canvasWidth/2, 200, "You Win!" ,{ fontFamily: 'Farro', fontSize: "76pt", align: "center", color:"black", position: "absolute", strokeThickness: 5}).setOrigin(0.5)

        //Display name and score
        this.playerName = JSON.parse(sessionStorage.getItem('data')).userName;
        this.finalScore = JSON.parse(sessionStorage.getItem('score')).score;
        
        //display player's final score 
        this.add.text(canvasWidth/2, 300, this.playerName +" : " + this.finalScore + " pts",{font: '46px', fill: '#ffffff' }).setOrigin(0.5)

        
    }
    playAgain(){
        this.scene.start("playGame2");
        }

    update(){

    }

}//end bracket

export default Scene3