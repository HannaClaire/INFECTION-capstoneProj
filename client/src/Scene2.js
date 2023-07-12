

class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  
    }

    preload(){

    }
    create() {
        this.background = this.add.image(0,0, "gutsy");
        //this.background.angle = 90; //can rotate it for different aspects.
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "gutsy");
        //this.background.setOrigin(0, 0);
        
        this.background.setScale(2);

        this.add.text(20, 20, "Game play!", {fontSize: "26pt"});

        // this.blueVirus.setScale(1);
        this.blueVirus = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "blueVirus");
        this.blueVirus.flipX = true;

        this.anims.create({
            key: "blueVirus_anim",
            frames: this.anims.generateFrameNumbers("blueVirus",{ start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        //play the animations
        this.blueVirus.play("blueVirus_anim");
    }


    update(){
        // to call a function to move the cells vertically
        this.moveCell(this.blueVirus, 1);
        // this.moveCell(this.cell2, 1.5);
        // this.moveCell(this.cell3, 2);


    //to scroll the background image
    this.background.tilePositionY += 0.5;

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