## CodeClan Capstone Project by Hanna Durham & Becky Entwistle

# INFECTION

![]https://github.com/bjentwistle/Capstone_project_July23/blob/main/client/public/assets/images/Biohazard.png

## Unleash your viral invasion, evade vigilant white blood cells, and deploy cunning tactics to outsmart the immune system. Replicate, spread, and dominate in the intense struggle for survival within the host!

For our final project at CodeClan, we wanted to make something fun and educational that gave us a challenge beyond what we had learnt in the classroom and labs so far.

We chose to make a 2D game using the Phaser3[https://phaser.io/] engine. Sadly, during our project the website was under construction and we only had access to a portion of the site via Wayback machine. However, we managed with old tutorials on YouTube and GitHub repository for inspiration.

Infection is a fun and interactive game showing how a virus can infiltrate and infect the human host. The white blood cells of the immune system come at you and try to destroy you before you can spread throughout the body. You are just a virus trying to survive and reproduce in a hostile environment.

Use the WASD  or cursor keys to move in all directions.
Use Enter or spacebar to fire your mini virus bullets.

The first level has a target of 50 white blood cells to eliminate and if you survive with health points left you can tackle the next wave, which has 100.

After the second level you can see how you did on the leader board of highest scores.

Our tech stack comprised of:
- Phaser3
- Vite (for bundling)
- Javascript
- Mongodb
- Express
- Node.js


To run this project you will first need to clone this repo to your local drive.

Then in your chose directory:

- `npm install`
- `npm install phaser@3 –save-dev`

In a new tab, type:

- `cd server`
- `npm i mongodb@3.5.7`
- `npm run seeds`
- `npm run server:dev`

In another tab:

- `cd client`
- `npm install webfontloader`
- `npm run dev`

This client run should give you an address to open in a browser. *We recommend you use Chrome*
