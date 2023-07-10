class Scene1 extends Phaser.Scene {
    constructor () {
        super("bootGame")
    }

    preload(){
        this.load.image("background", "assets/images/background.png");

    }

    create() {
        this.add.text(20, 20, "Testing DB page");

        this.add.text (config.width / 2, config.height - 600 , 'Player : Score', { fontFamily: 'Arial',  fontSize: 20 });
        
        //this.scene.start("playGame");
    }
    
}//end bracket
