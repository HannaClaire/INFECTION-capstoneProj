use scores_db

db.dropDatabase()

db.users.insertMany([

{name: "Jack", highScore: 15000},
{name: "Collete", highScore: 6000},
{name: "Alex", highScore: 7000},
{name: "John", highScore: 8000}

])