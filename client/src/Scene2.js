
class Scene2 extends Phaser.Scene {
    constructor () {
        super("playGame")  
    }

    preload(){
        //this.load.image("blueVirus", "public/assets/images/Blue_Virus.png");

    }
    create() {
        this.blueVirus = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "blueVirus");
        this.blueVirus.setScale(1);

    }

}//end bracket

export default Scene2