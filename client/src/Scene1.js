class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
    }

    preload(){
        //this.load.image("blueVirus", "public/assets/images/Blue_Virus.png");
        this.load.image("gutsy", "public/assets/images/gutsy.png");
        this.load.spritesheet("blueVirus", "public/assets/spritesheets/bluespritesheet.png",{
            frameWidth: 50,
            frameHeight: 50
        });
    }

    create() {   
        this.scene.start("playGame");
    }
    
}//end bracket


export default Scene1
