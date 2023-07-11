class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
    }

    preload(){
        this.load.image("blueVirus", "public/assets/images/Blue_Virus.png");

    }

    create() {
        this.add.text(20, 20, "Testing DB page");

        this.add.text (window.innerWidth / 2, window.innerHeight - 2 , 'Player : Score', { fontFamily: 'Arial',  fontSize: 20 });
        
        this.scene.start("playGame");
    }
    
}//end bracket


export default Scene1
