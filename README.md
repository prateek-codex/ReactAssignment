
How to start the game:
    1. Open command prompt, Enter command "npm start"
    2. visit "https://localhost:8080"
    3. Enter your name, and start playing.
    4. After each win, leader board will be updated

Game rules:
1.	Mix up alphabets
2.	Place them on a 2x6 rows
3.	Show any two alphabets (1 from each row)
4.	If they match, take them off the rows (it’s a success)
5.	If they don’t match, flip them back
6.	Remember which alphabet was where
7.	Game over when all cards match and taken off the rows

Top Level Structure
    1. Server (Node JS) - Using Hapi
        Test cases: Jasmine-node
    2. Client (React based)
            Bundling (Webpack)
            Components (Tiles, board, App, header, leader board etc.)

Core Logic
    Server Side:
        1. Hapi server is created for REST API endpoints
        2. A custom logic is written for creating/maintaining an in-memory leaderboard.
    
    Client Side
        1. Component and State based patterns are used using React

Incomplete Items
    1. REDUX pattern
    2. Constants file
	3. Swagger implementation
