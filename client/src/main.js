import './style.css'
import { Scene, Game, WEBGL, GameObjects } from 'phaser';
import Scene1 from "./Scene1"
import Scene2 from "./Scene2"

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
      'Welcome to Phaser x Vite!',
      {
        color: 'pink',
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
  backgroundColor: 0xB61731,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    }
  },
  scene: [
    Scene1, Scene2
  ]
}

new Game(config);