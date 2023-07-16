import Phaser from "phaser";

class Scene3 extends Phaser.Scene {
    constructor () {
        super("gameOver")
    }

    preload(){
    
    }

    create() {  
        this.cameras.main.setBackgroundColor(0x076000)
        const canvasWidth = this.scale.canvas.width;
       // const canvasHeight = this.scale.canvas.height;
        const text = this.add.text(canvasWidth/2, 200, "GAME OVER!" ,{ font: '76px'}).setOrigin(0.5)

        //Display name and score
        const playerName = JSON.parse(sessionStorage.getItem('data')).userName;
        const finalScore = JSON.parse(sessionStorage.getItem('score')).score;
        
        //display player's final score 
        this.add.text(canvasWidth/2, 300, playerName +" : " + finalScore + " pts",{ font: '46px', fill: '#ffffff' }).setOrigin(0.5)

        //LeaderBoard needs to extract names and scores from the database
        const results = []
        const data = fetch('http://localhost:9000/api/scores_db/')
        .then(res => res.json())
        .then(results => console.log(results))
        .catch(err => console.log(err.response))

        
    }

    update(){

    }

}//end bracket

export default Scene3