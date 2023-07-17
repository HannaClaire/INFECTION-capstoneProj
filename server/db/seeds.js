use scores_db

db.dropDatabase()

db.users.insertMany([

{name: "Hanna", highScore: 5000},
{name: "Becky", highScore: 600}

])