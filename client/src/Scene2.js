import Phaser from "phaser";

let bloodCells = [];

class VirusBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "virusBullet")
    }

    fire(x, y) {
        this.body.reset(x, y); 

        this.setActive(true);
        this.setVisible(true);

        this.setVelocity(0, -200);
    }

    preUpdate(time, delta){ //phasers lifecycle method - will shoot infinite amount of lasers as once reaching end of screen it will reset.
        super.preUpdate(time, delta)
        
        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class VirusBulletGroup extends Phaser.Physics.Arcade.Group //shoot
{
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: VirusBullet,
            frameQuantity:30, //how many bullets
            active: false, //inactive
            visible: false, //not visible
            key: "virusBullet"

        })
    }

    fireBullet(x, y){
        const virusBullet = this.getFirstDead(false);
        if(virusBullet) {
            virusBullet.fire(x, y)
        }
    }
}



class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  

        this.blueVirus = null;
        this.cursors = null;
        this.speed = 5;
        this.screenWidth = innerWidth; 
        this.screenHeight = innerHeight; 
        this.virusBulletGroup; //shoot
    }

    initiation(){   
    
    }

    preload(){
        this.load.image("virusBullet", "public/assets/images/virusBullet.png");

        this.load.spritesheet("bloodCell", "/public/assets/spritesheets/bloodcells.png",{
            frameWidth: 41,
            frameHeight: 40
        });

    }

    create() {

        this.addEvents();

        //retrieve playerName and Id from memory
        const playerName = JSON.parse(localStorage.getItem('data')).userName;
        const playerId = JSON.parse(localStorage.getItem('playerId')).playerId;

        const middleOfScreenH = this.screenHeight / 2
        const middleOfScreenW = this.screenWidth / 2;
        
        this.background = this.add.image(0, 0, "gutsy");
        //this.background.angle = 90; //can rotate it for different aspects.
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "gutsy");
        this.background.setScale(2);

        this.add.text(20, 20, "Game play!", {fontSize: "26pt"});
        // // Create the text object and set its properties
        this.playerNameText = this.add.text(window.innerWidth /2, 20, playerName , {fontSize: "26pt"});
        // this.playerNameText.setTint(tintColor);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.virusBulletGroup = new VirusBulletGroup(this);
        this.virusBulletGroup.getChildren().forEach((VirusBullet) =>  {VirusBullet.setScale(0.04)});
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

        // Create a bunch of blood cell sprites
        for (let i = 0; i < 24; i++) {
            let x = Phaser.Math.Between(0, window.innerWidth);
            let y = Phaser.Math.Between(0, window.innerHeight);
            const bloodCell = this.add.sprite(x, y, 'bloodCell');

            this.anims.create({
                key: "bloodCell_anim",
                frames: this.anims.generateFrameNumbers("bloodCell"),
                frameRate: 2,
                repeat: -1
            });

            bloodCell.play("bloodCell_anim");

            // Add the current blood cell sprite to the array
            bloodCells.push(bloodCell);
        }

    }

    addEvents(){
        this.input.keyboard.on('keydown-SPACE', () =>{
            this.shootVirusBullet(); // initiates the shooting functionality
        })
    }

    shootVirusBullet(){
        this.virusBulletGroup.fireBullet(this.blueVirus.x, this.blueVirus.y -20)
    }

    update(){
    
        //to scroll the background image
        this.background.tilePositionY += 0.5;

        this.moveCells();
        
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
    moveCells() {
        bloodCells.forEach(function(cell) {
            // Increase the position of the cell on the vertical axis
            const speed = Phaser.Math.Between(0, 3);
            cell.y += speed;

            // If the cell hits the bottom of the screen, call the reset function
            if (cell.y > window.innerHeight) {
                // Call the reset position function
                this.resetCellPos(cell);
            }
        }, this); // Pass 'this' as the second parameter to maintain the correct context
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