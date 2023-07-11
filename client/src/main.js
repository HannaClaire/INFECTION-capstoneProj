import './style.css'
import { Scene, Game, WEBGL, GameObjects } from 'phaser';

const canvas = document.getElementById('game');

class GameScene extends Scene {

  constructor() {
    super('scene-game');
  }

  create() {
    this.textbox = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      'Welcome to Phaser x Vite!',
      {
        color: '#FFF',
        fontFamily: 'monospace',
        fontSize: '26px'
      }
    );

    this.textbox.setOrigin(0.5, 0.5);
  }

  update(time, delta) {
    if (!this.textbox) {
      return;
    }

    this.textbox.rotation += 0.0005 * delta;
  }
}

const config = {
  type: WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    }
  },
  scene: [
    GameScene
  ]
}

new Game(config);