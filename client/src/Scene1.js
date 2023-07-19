import Phaser from "phaser";
import WebFontFile from '/src/WebFontFile'
import {postUser} from '/src/services.js'; 


class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
        this.openingMusic = null;
    }

    preload(){
        //load fonts
        const fonts = new WebFontFile(this.load, 'Farro')
		this.load.addFile(fonts)
        //load sounds
        this.load.audio("gameMusic", "public/assets/sounds/gameMusic.mp3", "public/assets/sounds/gameMusic.ogg" )
        this.load.audio("playGame", "public/assets/sounds/playGame.mp3" )
        //load images
        this.load.image("gutsy", "public/assets/images/gutsy.png");
        this.load.image("Biohazard", "public/assets/images/Biohazard.png");
        //load sprites
        this.load.spritesheet("blueVirus", "public/assets/spritesheets/bluespritesheet.png",{
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.spritesheet("cellsplosionSml", "public/assets/spritesheets/cellsplosionSml.png", {
            frameWidth: 63, // Replace with the actual frame width of each frame
            frameHeight: 64 // Replace with the actual frame height of each frame
        });

    }

    create() {   

        this.openingMusic = this.sound.add("gameMusic");
        this.startGame = this.sound.add("playGame")
        this.openingMusic.play()
        {
            const x = this.scale.width * 0.5
            const y = this.scale.height * 0.5
        }

        const X = window.innerWidth / 2;
        const Y = window.innerHeight / 2;
        this.background = this.add.image(X, Y, "Biohazard");

        
        const container = document.createElement("div");//creating a container/parent element for the child elements
        container.className = "container";
        document.body.appendChild(container);

            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.style.position = "absolute";
            inputElement.style.top = "60%";
            inputElement.style.left = "50%";
            inputElement.style.transform = "translate(-50%, -50%)";
            document.body.appendChild(inputElement);

            this.inputElement = inputElement;
            inputElement.focus(); // Set focus to the input element

            const submitButton = document.createElement("button");
            submitButton.textContent = "PLAY";
            submitButton.style.position = "absolute";
            submitButton.style.top = "65%";
            submitButton.style.left = "50%";
            submitButton.style.transform = "translate(-50%, -50%)";
            submitButton.style.backgroundColor = "#6B1518";
            submitButton.style.color = "white";
            submitButton.style.border= "5px solid black";
            submitButton.addEventListener("click", this.handleSubmit.bind(this));
            document.body.appendChild(submitButton);
            

            this.inputElement.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                this.handleSubmit();
                }
            });
            this.submitButton = submitButton;
            
            
            //Text around screen
            const canvasWidth = this.scale.canvas.width;
            const canvasHeight = this.scale.canvas.height;
            const welcome = this.add.text(canvasWidth / 2, 100, "INFECTION", {
                fontFamily: 'Farro', fontSize: "150pt", align: "center", color: "#3D1414", position: "absolute", strokeThickness: 3,
                shadow: { blur: 50, color: '#291414', fill: true, stroke: true }
            }).setOrigin(0.5);
            const label = this.add.text(canvasWidth/2, canvasHeight/2, "Input Player Name", {fontFamily: 'Farro', fontSize: "16pt", align: "center", position: "absolute"}).setOrigin(0.5); //basically means align at the center of the text(the half way point)
            
            //Controls help text
            // Add a keyboard key event to listen for the "?" key press to get help
            this.input.keyboard.on('keydown-CTRL', this.getHelp, this);
            const help = this.add.text(X, Y + 300, "CTRL for Help",{fontFamily: 'Farro', fontSize: "12pt"}).setOrigin(0.5)


        }

        getHelp(){
            // Destroy all game objects in the current scene to clear the canvas
            this.children.removeAll(true, true);
            this.inputElement.hidden = true;
            this.submitButton.hidden = true;
            this.scene.start("HelpScene");
            }

        async handleSubmit() {
            this.startGame.play() //makes the noise when pressing play
            const inputValue = this.inputElement.value;
            //save users input name in local storage to use in other scenes
            sessionStorage.setItem('data', JSON.stringify({ 
                "userName": inputValue
            }));
            //posting name and zero to DB        
            try {
                // Call the postUser function from services.js to post the data to the server
                const data = await postUser({ name: inputValue, highScore: 0 });
    
                // Access the id property from the response data
                const playerIdRtn = data._id;
    
                sessionStorage.setItem('playerId', JSON.stringify({ "playerId": playerIdRtn }));
                this.inputElement.hidden = true;
                this.submitButton.hidden = true;
                this.scene.start("playGame");
            } 
            catch (error) {console.error(error);}
        }  
    
}//end bracket

export default Scene1
