import Phaser from "phaser";

class VirusBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "virusBullet")
    }

    fire(x, y) {
        this.body.reset(x, y); 
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(0, -300);
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
            frameQuantity:30, //bullet amount (though technically infinite currently)
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

//start of game
class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  

        this.blueVirus = null;
        this.cursors = null;
        this.speed = 5;
        this.screenWidth = innerWidth; 
        this.screenHeight = innerHeight; 
        this.virusBulletGroup; //shoot

        this.score = 0;
        this.healthPoints = 50;
        this.gameOverStatus = false;
    }

    preload(){
        this.load.image("virusBullet", "public/assets/images/bullet.png");

        this.load.spritesheet("bloodCell", "/public/assets/spritesheets/whitebc.png",{
            frameWidth: 41,
            frameHeight: 40
        });
    }

    

    
    create() {

        this.addEvents();

        //retrieve playerName and Id from memory
        this.playerName = JSON.parse(sessionStorage.getItem('data')).userName;
        this.playerId = JSON.parse(sessionStorage.getItem('playerId')).playerId;

        const middleOfScreenH = this.screenHeight / 2
        const middleOfScreenW = this.screenWidth / 2;
        
        this.background = this.add.image(0, 0, "gutsy");
        //this.background.angle = 90; //can rotate it for different aspects.
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "gutsy");
        this.background.setScale(2);
    
        // Create the player name text 
        this.playerNameText = this.add.text(window.innerWidth /2, 20, this.playerName , {fontSize: "20pt"});
        this.playerNameText.setOrigin(0.5);

        // Create the health points text 
        this.healthPointsText = this.add.text(10, 10, "HP: 50" , {fontSize: "20pt"});
        this.healthPointsText.setOrigin(0,0)
        
        // Create the scoreText 
        this.scoreText = this.add.text(window.innerWidth - 10, 10, "SCORE: ", {fontSize: "20px"});
        this.scoreText.setOrigin(1, 0);

        // Add a keyboard key event to listen for the "y" key press to quit the game
        this.input.keyboard.on('keydown-Y', this.quitGame, this);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        

        this.virusBulletGroup = new VirusBulletGroup(this);
        this.virusBulletGroup.getChildren().forEach((VirusBullet) =>  {VirusBullet.setScale(0.12)});
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

        // this.anims.create({
        //     key: "explosion_anim",
        //     frames: this.anims.generateFrameNumbers("cellsplosion"),
        //     frameRate: 10,
        //     repeat: 0,
        //     hideOnComplete: true // Automatically hide the explosion animation when it finishes playing
        // });
        let keyA;
        let keyS;
        let keyD;
        let keyW;
    
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        //play the animations
        this.blueVirus.play("blueVirus_anim");

    
        // Create a bunch of blood cell sprites
        this.anims.create({
            key: "bloodCell_anim",
            frames: this.anims.generateFrameNumbers("bloodCell"),
            frameRate: 2,
            repeat: -1
        });

        this.bloodCells = this.physics.add.group(
            { 
                key: 'bloodCell',
                immovable : false,
                quantity: 24
            });
        
        this.bloodCells.children.each(function(cell) {
                let x = Math.random()*window.innerWidth;
                let y = 40;

                // Set the initial position of the bloodCell sprite
                cell.x = x;
                cell.y = y;

                //Set initial speed of bloodCells moving down the screen
                let speedY = Phaser.Math.FloatBetween(0.5, 2.5);
                cell.speedY = speedY;
            
                //  Play sprite animation
                cell.anims.play("bloodCell_anim");

                // // Set the bloodCells group as the collider for each individual cell?
                // this.physics.add.collider(cell, this.bloodCells);
                // // //Set bloodCells to collide with virusBullets? - goes in Update maybe
                // this.physics.add.collider(cell, this.virusBullet)
        
        }, this); //End of bloodCells group
        
    let keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

        
    }//end of create func


    // Define the quitGame function
    quitGame() {
        this.gameOverStatus = true;
    }

    addEvents(){
        this.input.keyboard.on('keydown-SPACE', () =>{
            this.shootVirusBullet(); // initiates the shooting functionality
        })
        this.input.keyboard.on('keydown-ENTER', () =>{
            this.shootVirusBullet(); // initiates the shooting functionality
        })
    }

    shootVirusBullet(){
        this.virusBulletGroup.fireBullet(this.blueVirus.x, this.blueVirus.y -20)
    }

    // handleBulletBloodCellCollision(virusBullet, bloodCell) {
    //     // Handle the collision between bullet and blood cell
    //     // For example, destroy the blood cell and remove the bullet
    //     const explosion = this.add.sprite(bloodCell.x, bloodCell.y, "cellsplosion");
    //     explosion.play("explosion_anim");

    //     explosion.on("animationcomplete", () => {
    //         explosion.destroy();
    //     });

    //     bloodCell.destroy();
    //     virusBullet.destroy();
    // }

    update(){
    
        //to scroll the background image
        this.background.tilePositionY += 0.5;

        //update position of white blood cells
        this.moveCells();
        console.log("cursors", this.cursors)
        //below is initialising the virus' movement around the visible screen (bounded by the sprites boundary physics in create method above)

        let keyA;
        let keyS;
        let keyD;
        let keyW;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        if (keyA.isDown || this.cursors.left.isDown) {
            this.blueVirus.x -= this.speed;
            console.log('A key pressed')
        } else if (keyS.isDown || this.cursors.down.isDown) {
            this.blueVirus.y += this.speed;
            console.log('S key pressed')
        } else if (keyD.isDown || this.cursors.right.isDown) {
            this.blueVirus.x += this.speed;
            console.log('D key pressed')
        } else if (keyW.isDown || this.cursors.up.isDown) {
            this.blueVirus.y -= this.speed;
            console.log('W key pressed')
        }
        

         // Check for collision between blood cell and virusBullets
         //this.physics.add.collider(this.bloodCells, this.virusBullets, function(bloodCell, virusBullet) {
            // Increment the score when collision occurs
            this.score += 100;

            // Update the score text
            this.scoreText.setText("Score: " + this.score);
        // });

        // Check for collision between bloodCells and blueVirus
         //this.physics.add.collider(this.bloodCells, this.blueVirus, function(bloodCell, blueVirus) {
            // Decrement the healthPoints when collision occurs between blueVirus and and bloodCell
            // if (this.healthPoints == 0) {
            //     this.gameOverStatus = true;
            // } else {
                
            //     this.healthPoints -= 10;
            // }
            
            // Update the score text
            this.healthPointsText.setText("HP: " + this.healthPoints);
        // });

        if (this.gameOverStatus){
            //turns off listener for y to quit
            this.input.keyboard.off('keydown-Y', this.quitGame, this);
            
            this.scene.start("gameOver");
            //simulate a game over to update users scores.
            let finalScore = this.score;
            sessionStorage.setItem("score", JSON.stringify({ "score": finalScore}));

            // could add a fetch here and compare highScore to finalScore before updating
            // would mean we don't have to wrangle the data much on the leader board
            fetch('http://localhost:9000/api/scores_db/' + this.playerId, {
                method: 'PUT',
                body: JSON.stringify({
                    name:this.playerName,
                    highScore:finalScore
            }),
            headers: { 'Content-type': 'application/json' }
            })
            .then(res => res.json())
            .catch(err => console.log(err.response))
      
        }

    
    }//end of update func

    

        //start of moving bloodCells code
        moveCells() {
            this.bloodCells.children.each(function(cell) {
                // Update the y position of the blood cell sprite
                cell.y += cell.speedY;

                // Reset the x position to a new random value
                if (cell.y > window.innerHeight) {
                        this.resetCellPos(cell)
                    }
                
            }, this);
        }

        resetCellPos(cell) {
            // Put the cell on the top of the window.
            cell.y = 0;

            // Generate a non-zero random speed for the blood cell
            let newSpeedY;
            do {
                newSpeedY = Phaser.Math.Between(1, 5);
            } while (newSpeedY === 0);
            cell.speedY = newSpeedY;

            // Put the cell on a new random position on the x-axis
            const randomX = Phaser.Math.Between(5, window.innerWidth-5 );
            cell.x = randomX;

        } //end of moving bloodCells code

}//end bracket

export default Scene2