import './style.css'
import { Scene, Animations, Game, WEBGL, GameObjects } from 'phaser';
import Scene1 from "./Scene1" //start scene with name input
import Scene2 from "./Scene2" //level one game play
import Scene3 from "./Scene3" //game over scene
import Scene4 from "./Scene4" //level2 play again scene
import Scene5 from "./Scene5" //You win scene 
import SceneHelp from "./SceneHelp" //Help Scene

const canvas = document.getElementById('game');

class GameScene extends Scene {

  constructor() {
    super('GameScene');
  }

  preload(){
    //preload here 
    //
  }

  create() {
    this.textbox = this.add.text(
      window.innerWidth/2,
      window.innerHeight/2,
      'Welcome to Infection!',
      {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '26px'
      }
    );
    
    this.textbox.setOrigin(0.5, 0.5);

  }
}

const config = {
  type: WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  backgroundColor: '#6B1518',
  pixelArt: true,
  fps: {
      target: 60,
      forceSetTimeOut: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    }
  },
  // dom: {
  //   createContainer: true
  // },
  scene: [
    Scene1, Scene2, Scene3, Scene4, Scene5, SceneHelp
  ]
}

let game = new Game(config);

export default GameScene