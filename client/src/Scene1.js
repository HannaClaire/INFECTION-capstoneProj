import Phaser from "phaser";


class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
    }

    preload(){
        // this.load.image("virusBullet", "public/assets/images/virusBullet.png" )
        this.load.image("gutsy", "public/assets/images/gutsy.png");
        this.load.spritesheet("blueVirus", "public/assets/spritesheets/bluespritesheet.png",{
            frameWidth: 50,
            frameHeight: 50
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

            const submitButton = document.createElement("button");
            submitButton.textContent = "Submit";
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
            const welcome = this.add.text(canvasWidth/2, 100, "Welcome to Infection!", {fontSize: "36pt", align: "center", color:"black", position: "absolute"})
            const label = this.add.text(canvasWidth/2, canvasHeight/2, "Input your player name", {fontSize: "16pt", align: "center", position: "absolute"});
            label.setOrigin(0.5); //basically means align at the center of the text(the half way point)
            welcome.setOrigin(0.5);

        }

        async handleSubmit() {
            const inputValue = this.inputElement.value;
            //save users input name in local storage to use in other scenes
            localStorage.setItem('data', JSON.stringify({ 
                "userName": inputValue
            }));
            //posting name and zero to DB        
            await fetch('http://localhost:9000/api/scores_db/', {
                method: 'POST',
                body: JSON.stringify({name:inputValue,highScore:0}),
                headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(data => {
                    // Access the id property from the parsed data from db res
                    const playerIdRtn = data._id;
                    console.log("Object id: ", playerIdRtn);
                    localStorage.setItem('playerId', JSON.stringify({ 
                        "playerId": playerIdRtn
                        }));
                    this.inputElement.hidden = true;
                    this.submitButton.hidden = true;
                    this.scene.start("playGame");
                })
                .catch(err => console.log(err.response))
        }  
    
}//end bracket

export default Scene1
