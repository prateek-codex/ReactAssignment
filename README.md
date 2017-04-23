How To:
    1. Open command prompt, Enter command "npm start"
    2. visit "https://localhost:8080"
    3. Enter your name, and start playing.
    4. After each win, leader board will be updated

Top Level Structure
    1. Server (Node JS) - Using Hapi
    2. Client (React based)
            Bundling (Webpack)
            Components (Tiles, board, App, header, leader board etc.)

Core Logic
    Server Side:
        1. Hapi server is created with few API endpoints
        2. A custom logic is written for creating/maintaining an in-memory leaderboard.
    
    Client Side
        1. Component and State based patterns are used using React

Incomplete Items
    1. REDUX pattern
    2. Constants file
