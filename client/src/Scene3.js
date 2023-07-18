import Phaser from "phaser";
import WebFontFile from '/src/WebFontFile'
import {getUsers} from '/src/services.js'; 

class Scene3 extends Phaser.Scene {
    constructor () {
        super("gameOver")
    }

    preload(){
    
    
        const fonts = new WebFontFile(this.load, 'Bungee')
		this.load.addFile(fonts)
    }

    create() {  
        this.cameras.main.setBackgroundColor(0x6B1518)
        const canvasWidth = this.scale.canvas.width;

       // const canvasHeight = this.scale.canvas.height;
        const text = this.add.text(canvasWidth/2, 100, "GAME OVER!" ,{ fontFamily: 'Farro', fontSize: "76pt", align: "center", color:"black", position: "absolute", strokeThickness: 5}).setOrigin(0.5)

        //Display name and score
        this.playerName = JSON.parse(sessionStorage.getItem('data')).userName;
        this.finalScore = JSON.parse(sessionStorage.getItem('score')).score;
        
        //display player's final score 
        this.add.text(canvasWidth/2, 200, this.playerName +" : " + this.finalScore + " pts",{font: '46px', fill: '#ffffff' }).setOrigin(0.5)

        //LeaderBoard needs to extract names and scores from the database
        const results = []
        const data = getUsers () 
        .then(results => {
            
            //sort results from highest to low
            results.sort((a, b) => b.highScore - a.highScore);
            this.add.text(canvasWidth / 2, 350, "Highest Scores", {fontFamily: 'Farro', fontSize: "36pt", align: "center", color:"black", position: "absolute", strokeThickness: 4}).setOrigin(0.5);
            
            let yPosition = 400;

            // Loop through the results and display player names and scores
            for (let i = 0; i < 5; i++) {
                const playerName = results[i].name;
                const playerScore = results[i].highScore;

                // Display player name and score
                this.add.text(canvasWidth / 2, yPosition, playerName + ": " + playerScore + " pts", {
                    font: '32px',
                    fill: '#ffffff'
                }).setOrigin(0.5);

                yPosition += 40; // Increment yPosition to show the next player's data below the previous one
            };
        })
        .catch(err => console.log(err.response))
        
         // Add a button or key event to return to the main game scene
         this.input.keyboard.on('keydown-M', this.returnToMainGame, this);
         this.add.text(canvasWidth/2, 650, "Press M for Main Menu ", {fontFamily: 'Farro', fontSize: "20px"}).setOrigin(0.5);
 
    }

    returnToMainGame(){
        this.children.removeAll(true, true);
        window.location.reload();
        }
 
    
}//end bracket

export default Scene3