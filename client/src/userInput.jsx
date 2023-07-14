// class userInput extends phaser.scene {

// create(){
// const inputElement = document.createElement("input");
// inputElement.type = "text";
// inputElement.style.position = "absolute";
// inputElement.style.top = "60%";
// inputElement.style.left = "50%";
// inputElement.style.transform = "translate(-50%, -50%)";
// document.body.appendChild(inputElement);

// console.log(inputElement)

// this.inputElement = inputElement;

// const submitButton = document.createElement("button");
// submitButton.textContent = "Submit";
// submitButton.style.position = "absolute";
// submitButton.style.top = "65%";
// submitButton.style.left = "50%";
// submitButton.style.transform = "translate(-50%, -50%)";
// submitButton.addEventListener("click", this.handleSubmit.bind(this));
// document.body.appendChild(submitButton);

// this.submitButton = submitButton;
//         }

// async handleSubmit() {
//     const inputValue = this.inputElement.value;
//     console.log(inputValue)

//     const { MongoClient } = require('mongodb');

//     async function connectAndInsert() {
//         const uri = 'mongodb://localhost:27017';
//         const client = new MongoClient(uri);

//         try {
//             await client.connect();

//             const database = client.db('scores_db');
//             const collection = database.collection('users');

//             const newData = { name: inputValue };
//             const result = await collection.insertOne(newData);

//             console.log('Insert success:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             await client.close();
//         }
//     }

//     // Call the function to connect and insert
//     connectAndInsert();

//     try {
//         const response = await fetch('/users', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ data: inputValue }),
//         });

//         const data = await response.json();
//         console.log("Response data:", data);
//         this.inputElement.value = ""; // Clear the input field
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
// }

// export default userInput