

class Scene1 extends Phaser.Scene {
    constructor () {
        super("BootGame")
    }

    preload(){
        this.load.image("gutsy", "public/assets/images/gutsy.png");
        this.load.spritesheet("blueVirus", "public/assets/spritesheets/bluespritesheet.png",{
            frameWidth: 50,
            frameHeight: 50
        });

    }

    create() {   
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
            const welcome = this.add.text(canvasWidth/2, 100, "Welcome to Infection!", {fontSize: "36pt", align: "center", color:"black"})
            const label = this.add.text(canvasWidth/2, canvasHeight/2, "Input your player name", {fontSize: "16pt", align: "center"});
            label.setOrigin(0.5); //basically means align at the center of the text(the half way point)
            welcome.setOrigin(0.5);

        }

        async handleSubmit() {
                    const inputValue = this.inputElement.value;
                    console.log(typeof inputValue)
                    //save users input name in local storage to use in other scenes
                    localStorage.setItem('data', JSON.stringify({ 
                        "userName": inputValue
                    }));
            //posting name and zero to DB        
            fetch('http://localhost:9000/api/scores_db/', {
                method: 'POST',
                body: JSON.stringify({name:inputValue,highScore:0}),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json()).catch(err => console.log(err.response))
                .then(this.inputElement.hidden = true)
                .then(this.submitButton.hidden = true)
                .then(this.scene.start("playGame"))
        }    
    
}//end bracket


export default Scene1
