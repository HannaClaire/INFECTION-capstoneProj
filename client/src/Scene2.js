import Phaser from "phaser";

class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  

        this.blueVirus = null;
        this.cursors = null;
        this.speed = 5;
        this.screenWidth = innerWidth; 
        this.screenHeight = innerHeight; 
    }

    initiation(){   
    
    }

    preload(){

    }

    create() {
        //retrieve playerName and Id from memory
        const playerName = JSON.parse(localStorage.getItem('data')).userName;
        const playerId = JSON.parse(localStorage.getItem('playerId')).playerId;

        const middleOfScreenH = this.screenHeight / 2
        const middleOfScreenW = this.screenWidth / 2;
        // this.blueVirus.setCollideWorldBounds(true)
        this.background = this.add.image(0, 0, "gutsy");
        //this.background.angle = 90; //can rotate it for different aspects.
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "gutsy");
        this.background.setScale(2);

        this.add.text(20, 20, "Game play!", {fontSize: "26pt"});
        // // Create the text object and set its properties
        this.playerNameText = this.add.text(window.innerWidth /2, 20, playerName , {fontSize: "26pt"});
        // this.playerNameText.setTint(tintColor);

        this.cursors = this.input.keyboard.createCursorKeys();

        //below needs the physics to create an 'arcadeSprite' object to allow for additional behaviours/methods
        this.blueVirus = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight, "blueVirus");
        this.blueVirus.setCollideWorldBounds(true) //sets boundaries around the window
        this.blueVirus.flipX = true;
        
        this.anims.create({
            key: "blueVirus_anim",
            frames: this.anims.generateFrameNumbers("blueVirus",{ start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        //play the animations
        this.blueVirus.play("blueVirus_anim");

        //simulate a game over to update users scores.
        const finalScore = 400;

        localStorage.setItem("score", JSON.stringify({ "score": finalScore}));
    

        fetch('http://localhost:9000/api/scores_db/' + playerId, {
            method: 'PUT',
            body: JSON.stringify({
                name:playerName,
                highScore:finalScore
            }),
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .catch(err => console.log(err.response))

            const gameOverStatus = false;
            if (gameOverStatus == true){
                this.scene.start("gameOver");
            }
    }

    update(){
        // to call a function to move the cells vertically
        // this.moveCell(this.blueVirus, 1);
        // this.moveCell(this.cell2, 1.5);
        // this.moveCell(this.cell3, 2);

        //to scroll the background image
        this.background.tilePositionY += 0.5;
        
        //below is initialising the virus' movement around the visible screen (bounded by the sprites boundary physics in create method above)
        if (this.cursors.left.isDown && this.blueVirus.x > 0) {
            this.blueVirus.x -= this.speed;
        } else if (this.cursors.right.isDown && this.blueVirus.x < this.screenWidth) {
            this.blueVirus.x += this.speed;
        }

        if (this.cursors.up.isDown && this.blueVirus.y > 0) {
            this.blueVirus.y -= this.speed;
        } else if (this.cursors.down.isDown && this.blueVirus.y < this.screenHeight) {
            this.blueVirus.y += this.speed;
        }
    
    }
    // create the function to move the ships
    moveCell(cell, speed) {
        // increase the position of the cell on the vertical axis
        cell.y += speed;
        // if the cell hits the bottom of the screen call the reset function
        if (cell.y > window.innerHeight) {
        //call a reset position function
        this.resetCellPos(cell);
        }
    }

    //create the reset position function
    resetCellPos(cell){
      // put the cell on the top of the window.
        cell.y = 0;
      // put the cell on a random position on the x axis
        const randomX = Phaser.Math.Between(0, window.innerWidth);
        cell.x = randomX;
    }

}//end bracket

export default Scene2