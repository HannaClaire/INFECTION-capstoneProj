import Phaser from "phaser";
import WebFontFile from '/src/WebFontFile'
import {postUser} from '/src/services.js'; 


class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
    }

    preload(){
        const fonts = new WebFontFile(this.load, 'Jua')
		this.load.addFile(fonts)

        // this.load.image("virusBullet", "public/assets/images/virusBullet.png" )
        this.load.image("gutsy", "public/assets/images/gutsy.png");
        this.load.spritesheet("blueVirus", "public/assets/spritesheets/bluespritesheet.png",{
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.spritesheet("cellsplosion", "public/assets/spritesheets/cellsplosion.png", {
            frameWidth: 16, // Replace with the actual frame width of each frame
            frameHeight: 16 // Replace with the actual frame height of each frame
        });

    }

    create() {   
        
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
            submitButton.textContent = "PLAY!";
            submitButton.style.position = "absolute";
            submitButton.style.top = "65%";
            submitButton.style.left = "50%";
            submitButton.style.transform = "translate(-50%, -50%)";
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
            const welcome = this.add.text(canvasWidth/2, 100, "INFECTION", {fontFamily: 'Jua',fontSize: "100pt", align: "center", color:"black", position: "absolute"})
            const label = this.add.text(canvasWidth/2, canvasHeight/2, "Input your player name", {fontFamily: 'Bungee', fontSize: "16pt", align: "center", position: "absolute"});
            label.setOrigin(0.5); //basically means align at the center of the text(the half way point)
            welcome.setOrigin(0.5);

        }

        async handleSubmit() {
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
