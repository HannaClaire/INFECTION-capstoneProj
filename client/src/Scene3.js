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
        this.cameras.main.setBackgroundColor(0x0760f0)
        const canvasWidth = this.scale.canvas.width;
       // const canvasHeight = this.scale.canvas.height;
        const text = this.add.text(canvasWidth/2, 100, "GAME OVER!" ,{ fontFamily: 'Bungee', fontSize: "76pt", align: "center", color:"black", position: "absolute"}).setOrigin(0.5)

        //Display name and score
        this.playerName = JSON.parse(sessionStorage.getItem('data')).userName;
        this.finalScore = JSON.parse(sessionStorage.getItem('score')).score;
        
        //display player's final score 
        this.add.text(canvasWidth/2, 200, this.playerName +" : " + this.finalScore + " pts",{font: '46px', fill: '#ffffff' }).setOrigin(0.5)

        //LeaderBoard needs to extract names and scores from the database
        const results = []
        const data = getUsers () //fetch('http://localhost:9000/api/scores_db/')
        .then(results => {
            
            //sort results from highest to low
            results.sort((a, b) => b.highScore - a.highScore);
            this.add.text(canvasWidth / 2, 350, "Highest Scores", {fontFamily: 'Bungee', fontSize: "36pt", align: "center", color:"black", position: "absolute"}).setOrigin(0.5);
            
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
        
    }

    update(){

    }

}//end bracket

export default Scene3