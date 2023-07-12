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

            this.submitButton = submitButton;
        
        }

        async handleSubmit() {
                    const inputValue = this.inputElement.value;
                    console.log(inputValue)
            fetch('http://localhost:9000/api/scores_db/', {
                method: 'POST',
                body: JSON.stringify({name:inputValue,highScore:0}),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json()).catch(err => console.log(err.response))
                .then(this.scene.start("playGame"))
        }    
    
}//end bracket


export default Scene1
