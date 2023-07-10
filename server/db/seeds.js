use scores_db

db.dropDatabase()

db.users.insertMany([

{name: "Hanna", highScore: 50},
{name: "Becky", highScore: 60}

])