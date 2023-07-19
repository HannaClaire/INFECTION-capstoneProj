import Phaser from "phaser";
import WebFontFile from '/src/WebFontFile'

class SceneHelp extends Phaser.Scene {
    constructor () {
        super("HelpScene")
        this.openingMusic = null;
    }

    preload(){
        //load fonts
        const fonts = new WebFontFile(this.load, 'Farro')
		this.load.addFile(fonts)
        //load sounds
        this.load.audio("gameMusic", "public/assets/sounds/gameMusic.mp3", "public/assets/sounds/gameMusic.ogg" )
        // //load images
        this.load.image("Biohazard", "public/assets/images/Biohazard.png");
      
    }

    create() {   

        const X = window.innerWidth / 2;
        const Y = window.innerHeight / 2;
        this.background = this.add.image(X, Y, "Biohazard");

        //Text around screen
        const canvasWidth = this.scale.canvas.width;
        const canvasHeight = this.scale.canvas.height;

        this.add.text(X, 100, "INFECTION", {
            fontFamily: 'Farro', fontSize: "150pt", align: "center", color: "#3D1414", position: "absolute", strokeThickness: 3,
            shadow: { blur: 50, color: '#291414', fill: true, stroke: true }
        }).setOrigin(0.5);
        
        this.add.text(X, Y, "Game Controls", {
            fontFamily: 'Farro', fontSize: "24pt", align: "center", position: "absolute"
        }).setOrigin(0.5); 
        
        //Controls help text
        this.add.text(X, Y + 60, "Use either cursor keys or WASD to move",{fontFamily: 'Farro', fontSize: "16pt"}).setOrigin(0.5)
        this.add.text(X, Y + 110, "Use either Spacebar or enter to fire",{fontFamily: 'Farro', fontSize: "16pt"}).setOrigin(0.5)
        this.add.text(X, Y + 170, "Press Y to Quit",{fontFamily: 'Farro', fontSize: "16pt"}).setOrigin(0.5)

        // Add a keyboard key event to listen for the "M" key press to start the game

        // Add a button or key event to return to the main game scene
        this.input.keyboard.on('keydown-M', this.returnToMainGame, this);
        this.add.text(X, Y + 300, "Press M for Main Menu ", {fontFamily: 'Farro', fontSize: "20px"}).setOrigin(0.5);
  
        }
    
        returnToMainGame(){
            this.children.removeAll(true, true);
            this.scene.start("BootGame");
            }

 
    
}//end bracket

export default SceneHelp
