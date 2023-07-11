
class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  
    }

    preload(){

    }
    create() {
        
        this.background = this.add.image(0,0, "gutsy");
        //this.background = this.add.tileSprite(0, 0, this.window.innerWidth, this.window.innerHeight, "gutsy");
        this.background.angle = 90;
        //this.background.setOrigin(0, 0);
        this.background.setScale(1.25);

        this.add.text(20, 20, "Play game");

        this.blueVirus = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "blueVirus");
        this.blueVirus.setScale(1);

    }

}//end bracket

export default Scene2